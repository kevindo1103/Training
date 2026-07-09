from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session as DBSession

from core.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES
from db import get_db
from models import Participant

security = HTTPBearer()


def create_token(participant_id: str, session_id: str, role: str | None = None) -> str:
    payload = {
        "sub": participant_id,
        "session_id": session_id,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def _decode_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return payload


def get_current_user(
    payload: dict = Depends(_decode_token),
    db: DBSession = Depends(get_db),
) -> Participant:
    participant = db.query(Participant).filter(Participant.id == payload.get("sub")).first()
    if not participant:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Participant not found")
    return participant


def require_facilitator(payload: dict = Depends(_decode_token)) -> dict:
    if payload.get("role") != "facilitator":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Facilitator access required")
    return payload
