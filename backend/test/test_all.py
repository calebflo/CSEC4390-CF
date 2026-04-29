from fastapi.testclient import TestClient
from app.main import app
client = TestClient(app)
def test_health():
r = client.get("/health")
assert r.status_code == 200
assert r.json()["modules"] == 9
def test_ai_phishing_stats():
r = client.get("/api/ai-phishing/stats")
assert r.status_code == 200
def test_ai_phishing_generate():
r = client.post("/api/ai-phishing/generate",
json={"name":"Test","role":"CEO","attack_type":"spear"})
assert r.status_code == 200
# Add one test per router — copy the pattern above
# def test_prompt_injection_stats(): ...
# def test_ransomware_stats(): ...
# etc.
