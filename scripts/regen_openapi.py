import json
import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(REPO_ROOT, "backend")
sys.path.insert(0, BACKEND_DIR)

from main import app


def main():
    schema = app.openapi()
    out_path = os.path.join(REPO_ROOT, "docs", "openapi.json")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(schema, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"Regenerated {out_path}")


if __name__ == "__main__":
    main()
