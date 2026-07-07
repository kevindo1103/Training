from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import CORS_ORIGINS, DEFAULT_SESSION_ID
from db import Base, engine, SessionLocal
from models import Session
from routes import sessions, participants, responses, facilitator


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    _seed_default_session()
    yield


app = FastAPI(title="Dolphin Training Portal API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sessions.router)
app.include_router(participants.router)
app.include_router(responses.router)
app.include_router(facilitator.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}


def _seed_default_session():
    db = SessionLocal()
    try:
        existing = db.query(Session).filter(Session.id == DEFAULT_SESSION_ID).first()
        if not existing:
            db.add(Session(id=DEFAULT_SESSION_ID, module_id="module-1", name="Module 1 — Default Session"))
            db.commit()
    finally:
        db.close()
