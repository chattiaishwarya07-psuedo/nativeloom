import sys
from pathlib import Path

AI_BACKEND_DIR = Path(__file__).resolve().parent.parent / "ai_backend"

if str(AI_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BACKEND_DIR))

from app import app