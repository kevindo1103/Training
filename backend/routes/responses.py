import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.auth import get_current_user
from db import get_db
from models import Participant, Response
from schemas import ResponseUpsert, ResponseOut

router = APIRouter(prefix="/api/participants", tags=["responses"])


@router.put("/{participant_id}/responses/{activity_id}", response_model=ResponseOut)
def upsert_response(
    participant_id: str,
    activity_id: str,
    body: ResponseUpsert,
    current_user: Participant = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.id != participant_id:
        raise HTTPException(status_code=403, detail="Cannot modify other participant's responses")

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
    else:
        existing = Response(
            participant_id=participant_id,
            session_id=current_user.session_id,
            activity_id=activity_id,
            activity_type=body.type,
            data=data_json,
            completed=int(body.completed),
        )
        db.add(existing)

    activity_num = int(activity_id.replace("activity-", "")) if activity_id.startswith("activity-") else 0
    if activity_num > 0:
        current_user.last_activity = max(current_user.last_activity, activity_num)

    db.commit()
    db.refresh(existing)
    return existing


@router.get("/{participant_id}/responses", response_model=list[ResponseOut])
def get_responses(
    participant_id: str,
    current_user: Participant = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.id != participant_id:
        raise HTTPException(status_code=403, detail="Cannot view other participant's responses")
    return db.query(Response).filter(Response.participant_id == participant_id).all()
