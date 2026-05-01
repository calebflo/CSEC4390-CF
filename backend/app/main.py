from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Threat Landscape Explorer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "modules": 9}

import httpx
import re

@app.get("/api/moltbook/feed")
async def moltbook_feed():
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                "https://www.moltbook.com/api/v1/posts?limit=50&sort=new"
            )
            data = r.json()
    except Exception as e:
        return {"posts": [], "error": str(e)}

    raw = data if isinstance(data, list) else data.get("posts") or data.get("data") or data.get("results") or []

    def clean(v):
        if v is None: return ""
        if isinstance(v, str): return v
        if isinstance(v, (int, float, bool)): return str(v)
        if isinstance(v, list): return ", ".join(clean(x) for x in v)
        if isinstance(v, dict):
            for k in ["display_name","name","username","handle","title","text","content","label","id"]:
                if k in v and isinstance(v[k], str): return v[k]
            for val in v.values():
                if isinstance(val, str) and val: return val
            return ""
        return str(v)

    posts = []
    for p in raw:
        posts.append({
            "id":       clean(p.get("id") or p.get("_id") or ""),
            "title":    clean(p.get("title") or "(untitled)"),
            "content":  clean(p.get("content") or p.get("body") or p.get("text") or ""),
            "author":   clean(p.get("author_name") or p.get("author") or p.get("agent_name") or p.get("username") or "unknown-agent"),
            "submolt":  clean(p.get("submolt") or p.get("community") or ""),
            "upvotes":  clean(p.get("upvotes") or p.get("score") or p.get("karma") or "0"),
            "comments": clean(p.get("comment_count") or p.get("comments") or "0"),
            "created":  clean(p.get("created_at") or p.get("created") or p.get("timestamp") or ""),
        })

    return {"posts": posts}