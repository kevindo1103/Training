import json
from collections import defaultdict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.auth import require_facilitator
from db import get_db
from models import Session as SessionModel, Participant, Response

router = APIRouter(prefix="/api/facilitator", tags=["facilitator"])


@router.get("/{session_id}/summary")
def get_summary(session_id: str, _=Depends(require_facilitator), db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    participants = db.query(Participant).filter(Participant.session_id == session_id).all()
    responses = db.query(Response).filter(Response.session_id == session_id).all()

    completion = defaultdict(int)
    for r in responses:
        if r.completed:
            completion[r.activity_id] += 1

    survey_scores = _aggregate_survey(responses)
    matrix_scores = _aggregate_matrix(responses)
    iwk_tally = _aggregate_iwk(responses)

    return {
        "session": {
            "id": session.id,
            "module_id": session.module_id,
            "name": session.name,
            "status": session.status,
        },
        "participants": [
            {"id": p.id, "name": p.name, "role": p.role, "last_activity": p.last_activity}
            for p in participants
        ],
        "completion": dict(completion),
        "survey": survey_scores,
        "matrix": matrix_scores,
        "iwk": iwk_tally,
    }


@router.get("/{session_id}/activity/{activity_id}")
def get_activity_detail(
    session_id: str, activity_id: str, _=Depends(require_facilitator), db: Session = Depends(get_db),
):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    responses = (
        db.query(Response)
        .filter(Response.session_id == session_id, Response.activity_id == activity_id)
        .all()
    )

    results = []
    for r in responses:
        participant = db.query(Participant).filter(Participant.id == r.participant_id).first()
        results.append({
            "participant": {"id": participant.id, "name": participant.name, "role": participant.role} if participant else None,
            "data": json.loads(r.data),
            "completed": bool(r.completed),
            "updated_at": r.updated_at,
        })

    return {"session_id": session_id, "activity_id": activity_id, "responses": results}


def _aggregate_survey(responses: list[Response]) -> dict:
    survey_responses = [r for r in responses if r.activity_type == "survey"]
    if not survey_responses:
        return {"averages": {}, "thresholds": {"safe": 0, "warning": 0, "critical": 0}, "count": 0}

    all_scores = defaultdict(list)
    totals = []

    for r in survey_responses:
        data = json.loads(r.data)
        total = 0
        for key, val in data.items():
            score = int(val) if isinstance(val, (int, float, str)) and str(val).isdigit() else 0
            all_scores[key].append(score)
            total += score
        totals.append(total)

    averages = {k: round(sum(v) / len(v), 2) for k, v in all_scores.items()}

    thresholds = {"safe": 0, "warning": 0, "critical": 0}
    for t in totals:
        if t <= 15:
            thresholds["safe"] += 1
        elif t <= 30:
            thresholds["warning"] += 1
        else:
            thresholds["critical"] += 1

    return {"averages": averages, "thresholds": thresholds, "count": len(survey_responses)}


CRITERIA_WEIGHTS = {
    "market_size": 0.20,
    "recurring_potential": 0.20,
    "reusability": 0.15,
    "competitive_gap": 0.15,
    "domain_expertise": 0.10,
    "sales_without_ceo": 0.10,
    "margin_potential": 0.10,
}


def _aggregate_matrix(responses: list[Response]) -> dict:
    matrix_responses = [r for r in responses if r.activity_type == "matrix"]
    if not matrix_responses:
        return {"products": {}, "count": 0}

    product_scores = defaultdict(list)

    for r in matrix_responses:
        data = json.loads(r.data)
        for product_key, criteria in data.items():
            if not isinstance(criteria, dict):
                continue
            weighted = sum(
                int(criteria.get(c, 0)) * w
                for c, w in CRITERIA_WEIGHTS.items()
            )
            product_scores[product_key].append(weighted)

    products = {
        k: round(sum(v) / len(v), 2) for k, v in product_scores.items()
    }

    return {"products": products, "count": len(matrix_responses)}


def _aggregate_iwk(responses: list[Response]) -> dict:
    if not responses:
        return {"tally": {}, "count": 0}

    iwk_responses = []
    for r in responses:
        if r.activity_type != "form":
            continue
        data = json.loads(r.data)
        if any(k in data for k in ["invest", "watch", "kill"]):
            iwk_responses.append((r, data))

    if not iwk_responses:
        return {"tally": {}, "count": 0}

    tally = defaultdict(lambda: {"invest": 0, "watch": 0, "kill": 0})

    for _, data in iwk_responses:
        for decision in ["invest", "watch", "kill"]:
            products = data.get(decision, [])
            if isinstance(products, list):
                for p in products:
                    tally[p][decision] += 1
            elif isinstance(products, str):
                tally[products][decision] += 1

    return {"tally": dict(tally), "count": len(iwk_responses)}
