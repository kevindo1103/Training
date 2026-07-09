from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.auth import get_current_user
from db import get_db
from models import Participant
from schemas import ParticipantOut

router = APIRouter(prefix="/api/participants", tags=["participants"])


@router.get("/{participant_id}", response_model=ParticipantOut)
def get_participant(
    participant_id: str,
    current_user: Participant = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.id != participant_id:
        raise HTTPException(status_code=403, detail="Cannot view other participant's info")
    return current_user
