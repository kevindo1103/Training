import json

from pydantic import BaseModel, field_validator


class SessionCreate(BaseModel):
    module_id: str
    name: str | None = None


class SessionOut(BaseModel):
    id: str
    module_id: str
    name: str | None
    created_at: str
    status: str
    model_config = {"from_attributes": True}


class ParticipantOut(BaseModel):
    id: str
    session_id: str
    name: str
    role: str | None
    joined_at: str
    last_activity: int
    model_config = {"from_attributes": True}


class SessionDetail(SessionOut):
    participants: list[ParticipantOut] = []


class JoinSession(BaseModel):
    name: str


class FacilitatorAuth(BaseModel):
    secret: str


class JoinResponse(BaseModel):
    participant_id: str
    session_id: str
    token: str


class ResponseUpsert(BaseModel):
    type: str
    data: dict
    completed: bool = False


class ResponseOut(BaseModel):
    id: int
    participant_id: str
    session_id: str
    activity_id: str
    activity_type: str
    data: dict
    completed: int
    updated_at: str
    model_config = {"from_attributes": True}

    @field_validator("data", mode="before")
    @classmethod
    def parse_data(cls, v):
        if isinstance(v, str):
            return json.loads(v)
        return v
