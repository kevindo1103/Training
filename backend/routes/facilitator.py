import json
from collections import defaultdict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from core.auth import require_facilitator
from db import get_db
from models import Session as SessionModel, Participant, Response

router = APIRouter(prefix="/api/facilitator", tags=["facilitator"])

M2_UNIT_IDS = [
    "u1_sfpc", "u2_inventory", "u3_brand", "u4_spinoff",
    "u5_2axis", "u6_90day", "u7_lean", "u8_mvp",
    "u9_kill", "u10_pricing", "u11_convergence",
]

SPINOFF_WEIGHTS = {
    "standalone_revenue": 0.20,
    "scalability": 0.15,
    "operational_independence": 0.15,
    "customer_acquisition": 0.15,
    "team_readiness": 0.15,
    "brand_positioning": 0.10,
    "financial_sustainability": 0.10,
}


@router.get("/{session_id}/summary")
def get_summary(session_id: str, _=Depends(require_facilitator), db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    participants = db.query(Participant).filter(
        Participant.session_id == session_id, Participant.role != "facilitator"
    ).all()
    responses = db.query(Response).filter(Response.session_id == session_id).all()

    completion = defaultdict(int)
    for r in responses:
        if r.data and r.data != "{}":
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
        .options(joinedload(Response.participant))
        .all()
    )

    results = []
    for r in responses:
        p = r.participant
        results.append({
            "participant": {"id": p.id, "name": p.name, "role": p.role} if p else None,
            "data": json.loads(r.data),
            "completed": bool(r.completed),
            "updated_at": r.updated_at,
        })

    return {"session_id": session_id, "activity_id": activity_id, "responses": results}


@router.get("/{session_id}/module2/summary")
def get_module2_summary(session_id: str, _=Depends(require_facilitator), db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    participants = db.query(Participant).filter(
        Participant.session_id == session_id, Participant.role != "facilitator"
    ).all()

    responses = (
        db.query(Response)
        .filter(Response.session_id == session_id, Response.activity_id.in_(M2_UNIT_IDS))
        .options(joinedload(Response.participant))
        .all()
    )

    unit_completion = {uid: {"lecture": 0, "quiz": 0, "practice": 0} for uid in M2_UNIT_IDS}
    quiz_data = defaultdict(list)
    spinoff_scores = []

    for r in responses:
        uid = r.activity_id
        p = r.participant
        if p and p.role == "facilitator":
            continue
        p_info = {"id": p.id, "name": p.name, "role": p.role} if p else None
        try:
            data = json.loads(r.data) if r.data else {}
        except (json.JSONDecodeError, TypeError):
            continue

        if "lecture" in data:
            unit_completion[uid]["lecture"] += 1
        if "quiz" in data:
            unit_completion[uid]["quiz"] += 1
            q = data["quiz"]
            quiz_data[uid].append({
                "participant": p_info,
                "score": q.get("score", 0),
                "total": q.get("total", 5),
            })
        if "practice" in data:
            unit_completion[uid]["practice"] += 1

        if uid == "u4_spinoff" and "practice" in data:
            practice = data["practice"]
            matrix = practice.get("scores") or practice.get("matrix") or {}
            if isinstance(matrix, dict):
                product_scores = {}
                for product_id, criteria in matrix.items():
                    if not isinstance(criteria, dict):
                        continue
                    weighted = sum(
                        _safe_float(criteria.get(c, 0)) * w
                        for c, w in SPINOFF_WEIGHTS.items()
                    )
                    product_scores[product_id] = round(weighted, 2)
                if product_scores:
                    spinoff_scores.append({"participant": p_info, "scores": product_scores})

    quiz_scores = {
        uid: {
            "avg": round(sum(r["score"] for r in rs) / len(rs), 2),
            "responses": rs,
        }
        for uid, rs in quiz_data.items()
        if rs
    }

    product_totals = defaultdict(list)
    for entry in spinoff_scores:
        for product_id, score in entry["scores"].items():
            product_totals[product_id].append(score)

    return {
        "session": {"id": session.id, "name": session.name},
        "participants": [
            {"id": p.id, "name": p.name, "role": p.role} for p in participants
        ],
        "unit_completion": unit_completion,
        "quiz_scores": quiz_scores,
        "spinoff_matrix": {
            "participants": spinoff_scores,
            "averages": {
                pid: round(sum(scores) / len(scores), 2)
                for pid, scores in product_totals.items()
            },
        },
    }


@router.get("/{session_id}/module2/unit/{unit_id}")
def get_module2_unit(
    session_id: str, unit_id: str, _=Depends(require_facilitator), db: Session = Depends(get_db),
):
    if unit_id not in M2_UNIT_IDS:
        raise HTTPException(status_code=404, detail="Unit not found")

    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    responses = (
        db.query(Response)
        .filter(Response.session_id == session_id, Response.activity_id == unit_id)
        .options(joinedload(Response.participant))
        .all()
    )

    results = []
    for r in responses:
        p = r.participant
        if p and p.role == "facilitator":
            continue
        try:
            data = json.loads(r.data) if r.data else {}
        except (json.JSONDecodeError, TypeError):
            continue
        results.append({
            "participant": {"id": p.id, "name": p.name, "role": p.role} if p else None,
            "quiz": data.get("quiz"),
            "practice": data.get("practice"),
        })

    return {"unit_id": unit_id, "responses": results}


def _safe_float(val, default: float = 0.0) -> float:
    try:
        return float(val)
    except (TypeError, ValueError):
        return default


def _aggregate_survey(responses: list[Response]) -> dict:
    survey_responses = [r for r in responses if r.activity_type == "survey"]
    if not survey_responses:
        return {"averages": {}, "thresholds": {"safe": 0, "warning": 0, "critical": 0}, "count": 0}

    all_scores = defaultdict(list)
    totals = []

    for r in survey_responses:
        raw = json.loads(r.data)
        # Frontend stores {answers: {q1: 3, ...}, totalScore: N} — extract answers
        scores_dict = raw.get("answers", raw) if isinstance(raw.get("answers"), dict) else raw
        total = 0
        for key, val in scores_dict.items():
            try:
                score = int(round(float(val)))
            except (TypeError, ValueError):
                score = 0
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
        raw = json.loads(r.data)
        # Frontend stores {scores: {product: {criteria: score}}, weightedTotals: {...}}
        data = raw.get("scores", raw) if isinstance(raw.get("scores"), dict) else raw
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
        # Frontend stores {decisions: {product: "INVEST"/"WATCH"/"KILL"}}
        # or legacy flat format {invest: [...], watch: [...], kill: [...]}
        if "decisions" in data or any(k in data for k in ["invest", "watch", "kill"]):
            iwk_responses.append((r, data))

    if not iwk_responses:
        return {"tally": {}, "count": 0}

    tally = defaultdict(lambda: {"invest": 0, "watch": 0, "kill": 0})

    for _, data in iwk_responses:
        if "decisions" in data and isinstance(data["decisions"], dict):
            for product, decision in data["decisions"].items():
                d = decision.lower() if isinstance(decision, str) else ""
                if d in ("invest", "watch", "kill"):
                    tally[product][d] += 1
        else:
            for decision in ["invest", "watch", "kill"]:
                products = data.get(decision, [])
                if isinstance(products, list):
                    for p in products:
                        tally[p][decision] += 1
                elif isinstance(products, str):
                    tally[products][decision] += 1

    return {"tally": dict(tally), "count": len(iwk_responses)}
