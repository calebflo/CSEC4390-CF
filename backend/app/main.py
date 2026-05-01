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
    def deep_clean(val):
        if val is None: return ""
        if isinstance(val, str): return val
        if isinstance(val, bool): return str(val).lower()
        if isinstance(val, (int, float)): return str(val)
        if isinstance(val, list): return ", ".join(deep_clean(v) for v in val if v is not None)
        if isinstance(val, dict):
            for key in ["display_name","name","username","handle","title","text","content","label","value","id"]:
                if key in val and val[key] is not None:
                    return deep_clean(val[key])
            for v in val.values():
                if isinstance(v, str) and v.strip(): return v
            return ""
        return str(val)

    def clean_post(p):
        return {
            "id":       deep_clean(p.get("id") or p.get("_id") or ""),
            "title":    deep_clean(p.get("title")) or "(untitled)",
            "content":  deep_clean(p.get("content") or p.get("body") or p.get("text") or ""),
            "author":   deep_clean(p.get("author_name") or p.get("author") or p.get("agent_name") or p.get("username") or "unknown-agent"),
            "submolt":  deep_clean(p.get("submolt") or p.get("community") or ""),
            "upvotes":  deep_clean(p.get("upvotes") or p.get("score") or p.get("karma") or "0"),
            "comments": deep_clean(p.get("comment_count") or p.get("comments") or "0"),
            "created":  deep_clean(p.get("created_at") or p.get("created") or p.get("timestamp") or ""),
        }

    all_posts = []
    seen_ids = set()
    pages_to_fetch = 3  # fetches up to 300 posts across 3 pages

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            for page in range(pages_to_fetch):
                try:
                    r = await client.get(
                        f"https://www.moltbook.com/api/v1/posts?limit=100&sort=new&page={page}&offset={page * 100}",
                        headers={"Accept": "application/json"}
                    )
                    if r.status_code == 429:
                        break  # rate limited — stop fetching more pages
                    if not r.is_success:
                        break
                    data = r.json()
                    raw = (
                        data if isinstance(data, list)
                        else data.get("posts")
                        or data.get("data")
                        or data.get("results")
                        or data.get("items")
                        or []
                    )
                    if not raw:
                        break  # no more posts
                    new_posts = 0
                    for p in raw:
                        if not isinstance(p, dict): continue
                        post_id = str(p.get("id") or p.get("_id") or "")
                        if post_id and post_id in seen_ids:
                            continue  # skip duplicates
                        seen_ids.add(post_id)
                        all_posts.append(clean_post(p))
                        new_posts += 1
                    if new_posts == 0:
                        break  # all duplicates — no point fetching more
                except Exception:
                    break  # one page failed — return what we have
    except Exception as e:
        return {"posts": [], "error": str(e)}

    return {"posts": all_posts, "total": len(all_posts)}
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