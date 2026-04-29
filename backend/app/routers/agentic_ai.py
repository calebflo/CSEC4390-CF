from fastapi import APIRouter
from pydantic import BaseModel
router = APIRouter()
class AttackConfig(BaseModel):
name: str = "Sarah Chen"
role: str = "CFO"
attack_type: str = "spear"
@router.get("/stats")
def get_stats():
return {
"detection_rate": "3%",
"click_rate": "34%",
"sophistication": 9.1,
"gen_time_seconds": 1.4
}
@router.post("/generate")
def generate_attack(config: AttackConfig):
return {
"status": "generated",
"attack_type": config.attack_type,
"target": config.name,
"sophistication_score": 9.4,
"mitre_technique": "T1566.001"
}
