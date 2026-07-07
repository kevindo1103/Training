from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import get_db
from models import Session as SessionModel, Participant
from schemas import SessionCreate, SessionOut, SessionDetail, JoinSession, JoinResponse

router = APIRouter(prefix="/api/sessions", tags=["sessions"])


@router.post("", response_model=SessionOut, status_code=201)
def create_session(body: SessionCreate, db: Session = Depends(get_db)):
    session = SessionModel(module_id=body.module_id, name=body.name)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("", response_model=list[SessionOut])
def list_sessions(db: Session = Depends(get_db)):
    return db.query(SessionModel).all()


@router.get("/{session_id}", response_model=SessionDetail)
def get_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.post("/{session_id}/join", response_model=JoinResponse, status_code=201)
def join_session(session_id: str, body: JoinSession, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if session.status != "active":
        raise HTTPException(status_code=400, detail="Session is not active")

    participant = Participant(session_id=session_id, name=body.name, role=body.role)
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return JoinResponse(participant_id=participant.id, session_id=session_id)
