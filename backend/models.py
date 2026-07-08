import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, Text, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from db import Base


def gen_uuid():
    return str(uuid.uuid4())


def utcnow():
    return datetime.now(timezone.utc)


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Text, primary_key=True, default=gen_uuid)
    module_id = Column(Text, nullable=False)
    name = Column(Text)
    created_at = Column(Text, default=lambda: utcnow().isoformat())
    status = Column(Text, default="active")

    participants = relationship("Participant", back_populates="session")
    responses = relationship("Response", back_populates="session")


class Participant(Base):
    __tablename__ = "participants"

    id = Column(Text, primary_key=True, default=gen_uuid)
    session_id = Column(Text, ForeignKey("sessions.id"), nullable=False)
    name = Column(Text, nullable=False)
    role = Column(Text)
    joined_at = Column(Text, default=lambda: utcnow().isoformat())
    last_activity = Column(Integer, default=1)

    session = relationship("Session", back_populates="participants")
    responses = relationship("Response", back_populates="participant")


class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    participant_id = Column(Text, ForeignKey("participants.id"), nullable=False)
    session_id = Column(Text, ForeignKey("sessions.id"), nullable=False)
    activity_id = Column(Text, nullable=False)
    activity_type = Column(Text, nullable=False)
    data = Column(Text, nullable=False)
    completed = Column(Integer, default=0)
    updated_at = Column(Text, default=lambda: utcnow().isoformat(), onupdate=lambda: utcnow().isoformat())

    __table_args__ = (UniqueConstraint("participant_id", "activity_id"),)

    participant = relationship("Participant", back_populates="responses")
    session = relationship("Session", back_populates="responses")
