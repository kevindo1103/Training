import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import get_db
from models import Participant, Response
from schemas import ResponseUpsert, ResponseOut

router = APIRouter(prefix="/api/participants", tags=["responses"])


@router.put("/{participant_id}/responses/{activity_id}", response_model=ResponseOut)
def upsert_response(
    participant_id: str,
    activity_id: str,
    body: ResponseUpsert,
    db: Session = Depends(get_db),
):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found")

    existing = (
        db.query(Response)
        .filter(Response.participant_id == participant_id, Response.activity_id == activity_id)
        .first()
    )

    data_json = json.dumps(body.data, ensure_ascii=False)

    if existing:
        existing.activity_type = body.type
        existing.data = data_json
        existing.completed = int(body.completed)
        db.commit()
        db.refresh(existing)
        return existing

    response = Response(
        participant_id=participant_id,
        session_id=participant.session_id,
        activity_id=activity_id,
        activity_type=body.type,
        data=data_json,
        completed=int(body.completed),
    )
    db.add(response)
    db.commit()
    db.refresh(response)

    participant.last_activity = max(participant.last_activity, int(activity_id.replace("activity-", "")) if activity_id.startswith("activity-") else participant.last_activity)
    db.commit()

    return response


@router.get("/{participant_id}/responses", response_model=list[ResponseOut])
def get_responses(participant_id: str, db: Session = Depends(get_db)):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        raise HTTPException(status_code=404, detail="Participant not found")
    return db.query(Response).filter(Response.participant_id == participant_id).all()
