import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./training.db")
PORT = int(os.getenv("PORT", "8000"))
DEFAULT_SESSION_ID = "default-module1-session"
