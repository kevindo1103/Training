from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.auth import create_token, require_facilitator
from core.config import FACILITATOR_SECRET
from db import get_db
from models import Session as SessionModel, Participant
from schemas import SessionCreate, SessionOut, SessionDetail, JoinSession, JoinByModule, JoinResponse, FacilitatorAuth

router = APIRouter(prefix="/api/sessions", tags=["sessions"])


def _join(session_id: str, name: str, role: str | None, db: Session) -> JoinResponse:
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if session.status != "active":
        raise HTTPException(status_code=400, detail="Session is not active")

    participant = Participant(session_id=session_id, name=name, role=role or "participant")
    db.add(participant)
    db.commit()
    db.refresh(participant)

    token = create_token(participant.id, session_id, "participant")
    return JoinResponse(participant_id=participant.id, session_id=session_id, token=token)


@router.post("", response_model=SessionOut, status_code=201)
def create_session(body: SessionCreate, _=Depends(require_facilitator), db: Session = Depends(get_db)):
    session = SessionModel(module_id=body.module_id, name=body.name)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("", response_model=list[SessionOut])
def list_sessions(db: Session = Depends(get_db)):
    return db.query(SessionModel).all()


@router.get("/{session_id}", response_model=SessionDetail)
def get_session(session_id: str, _=Depends(require_facilitator), db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.post("/{session_id}/join", response_model=JoinResponse, status_code=201)
def join_session(session_id: str, body: JoinSession, db: Session = Depends(get_db)):
    return _join(session_id, body.name, body.role, db)


@router.post("/join", response_model=JoinResponse, status_code=201)
def join_by_module(body: JoinByModule, db: Session = Depends(get_db)):
    session = (
        db.query(SessionModel)
        .filter(SessionModel.module_id == body.module_id, SessionModel.status == "active")
        .order_by(SessionModel.created_at.desc())
        .first()
    )
    if not session:
        session = SessionModel(module_id=body.module_id, name=f"Auto session for {body.module_id}")
        db.add(session)
        db.commit()
        db.refresh(session)
    return _join(session.id, body.name, body.role, db)


@router.post("/{session_id}/facilitator-auth", response_model=JoinResponse, status_code=201)
def facilitator_auth(session_id: str, body: FacilitatorAuth, db: Session = Depends(get_db)):
    if not FACILITATOR_SECRET or body.secret != FACILITATOR_SECRET:
        raise HTTPException(status_code=403, detail="Invalid facilitator secret")

    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    facilitator = (
        db.query(Participant)
        .filter(Participant.session_id == session_id, Participant.role == "facilitator")
        .first()
    )
    if not facilitator:
        facilitator = Participant(session_id=session_id, name="Facilitator", role="facilitator")
        db.add(facilitator)
        db.commit()
        db.refresh(facilitator)

    token = create_token(facilitator.id, session_id, "facilitator")
    return JoinResponse(participant_id=facilitator.id, session_id=session_id, token=token)
