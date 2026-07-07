import os
import warnings
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./training.db")
PORT = int(os.getenv("PORT", "8000"))
DEFAULT_SESSION_ID = "default-module1-session"

_JWT_SECRET_DEFAULT = "change-me-in-production"
JWT_SECRET = os.getenv("JWT_SECRET", _JWT_SECRET_DEFAULT)
if JWT_SECRET == _JWT_SECRET_DEFAULT:
    if os.getenv("ENV", "dev") != "dev":
        raise RuntimeError("JWT_SECRET must be set in production (ENV != dev)")
    warnings.warn("JWT_SECRET is not set — using insecure default. Safe for local dev only.", stacklevel=2)

JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "1440"))

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:8080,http://localhost:3000").split(",")

FACILITATOR_SECRET = os.getenv("FACILITATOR_SECRET", "")
