from pydantic import BaseModel


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
    role: str | None = None


class JoinResponse(BaseModel):
    participant_id: str
    session_id: str


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
    data: str
    completed: int
    updated_at: str
    model_config = {"from_attributes": True}
