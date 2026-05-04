# 🛡️ Threat Landscape Explorer

> An interactive cybersecurity education platform simulating 9 critical threat vectors targeting a fictional financial services company — with live AI agent threat intelligence from Moltbook.com.

[![CI](https://github.com/calebflo/CSEC4390-CF/actions/workflows/ci.yml/badge.svg)](https://github.com/calebflo/CSEC4390-CF/actions)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docs.docker.com/compose/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 Mission Statement

Financial institutions face rapidly evolving AI-powered threats that most cybersecurity education tools fail to cover — prompt injection, agentic AI hijacking, smart home pivots, and LLM-generated phishing campaigns that bypass traditional defenses at 91% rates.

Threat Landscape Explorer bridges this gap. Each of the 9 modules streams a live attack kill chain against **FinsecCorp** (a fictional financial services company), replays the same scenario in **Defended Mode** to show exactly what each security control blocks, and connects to a **live Moltbook AI agent feed** so real agent behavior can be mapped to enterprise attack patterns in real time.

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| 📖 Full Documentation (Wiki) | [github.com/calebflo/CSEC4390-CF/wiki](https://github.com/calebflo/CSEC4390-CF/wiki) |
| 📋 Project Board (Kanban) | [github.com/calebflo/CSEC4390-CF/projects](https://github.com/calebflo/CSEC4390-CF/projects) |
| 🎥 Demo Video | [30-Minute Preliminary Presentation](#) |
| 🔌 API Docs (Swagger) | http://localhost:8000/docs *(run locally)* |
| 🐛 Issues & User Stories | [github.com/calebflo/CSEC4390-CF/issues](https://github.com/calebflo/CSEC4390-CF/issues) |

---

## ⚡ Quick Start

**Prerequisites:** Docker Desktop, Git

```bash
# 1. Clone the repository
git clone https://github.com/calebflo/CSEC4390-CF.git
cd CSEC4390-CF

# 2. Start both services with one command
docker-compose up

# 3. Open the app
# Frontend:  http://localhost:5173
# API Docs:  http://localhost:8000/docs
```

That is it. No environment variables required for local development.

### Full Rebuild (if files are not updating)

```bash
docker-compose down -v
docker system prune -f
docker-compose up --build --force-recreate
```

### Clear Vite Cache (if frontend changes do not appear)

```bash
docker exec csec4390-cf-frontend-1 rm -rf /app/node_modules/.vite
docker-compose restart frontend
```

---

## 🗂️ Project Structure
CSEC4390-CF/

├── frontend/

│   ├── src/

│   │   ├── pages/              # Dashboard + 9 threat modules + MoltbookFeed

│   │   ├── components/         # ModuleHeader, StatCard, Terminal, DefenseBox

│   │   ├── context/            # SimulationContext (cross-module state)

│   │   ├── App.jsx             # Router + nav

│   │   ├── main.jsx            # ReactDOM entry + providers

│   │   └── index.css           # Global dark theme

│   ├── tailwind.config.js

│   ├── package.json

│   └── Dockerfile

├── backend/

│   ├── app/

│   │   ├── main.py             # FastAPI app + all endpoints

│   │   └── routers/            # 9 module routers

│   ├── tests/

│   │   └── test_all.py         # pytest suite

│   ├── requirements.txt

│   └── Dockerfile

├── .github/

│   └── workflows/

│       └── ci.yml              # GitHub Actions CI

├── docker-compose.yml

└── README.md

---

## 🧠 Threat Modules

| # | Module | Severity | MITRE | Description |
|---|--------|----------|-------|-------------|
| 01 | AI Phishing Lab | 🔴 CRITICAL | T1566 | LLM-generated spear-phishing targeting FinsecCorp employees |
| 02 | Prompt Injection | 🔴 CRITICAL | OWASP LLM01 | Hijack FinsecCorp GPT-4o customer service agent |
| 03 | Ransomware Chain | 🔴 CRITICAL | T1486 | 8-step BlackCat/ALPHV kill chain with VSS destruction |
| 04 | Identity Threats | 🟠 HIGH | T1539 | Session hijacking, AiTM proxy, deepfake CFO voice |
| 05 | Supply Chain | 🟠 HIGH | T1195 | npm poisoning plus Log4Shell CVE-2022-44228 |
| 06 | IoT Attack Mapper | 🟠 HIGH | T1078 | Hikvision CVE to corporate LAN via VLAN pivot |
| 07 | Smart Home Pivot | 🔴 CRITICAL | T1133 | CISO home network to VPN cert theft to corporate access |
| 08 | Wearable Biometrics | 🟠 HIGH | T1040 | BLE interception to Garmin breach to dark web sale |
| 09 | Agentic AI | 🔴 CRITICAL | OWASP LLM08 | Indirect injection hijacks agent across 4 enterprise tools |

Each module includes a streaming terminal simulation, Defended Mode toggle, and 5-point Defense Playbook.

---

## ⚡ Moltbook Live Feed

Moltbook.com is an AI agent social network acquired by Meta in March 2026. The platform monitors live agent posts for cybersecurity threat correlations and provides two actions on any threat-tagged post:

**Simulate This Attack** — generates 6 FinsecCorp-specific attack steps from the post content and navigates to the relevant module with steps pre-loaded.

**Threat Breakdown** — returns three inline panels showing the Objective, Motivation, and 5-step Execution Plan for how that agent behavior maps to a FinsecCorp attack.

Key stats: 2.6% of posts contain hidden prompt injection payloads. January 2026 API key leak exposed 1.5M agent tokens.

---

## 🏗️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | React | 18 | Component-based UI |
| Build | Vite | Latest | Fast HMR dev server |
| Styling | Tailwind CSS | 3 | Utility-first CSS |
| Routing | React Router DOM | 6 | Client-side navigation |
| State | React Context API | — | SimulationContext cross-module state |
| Backend | FastAPI | 0.109.0 | REST API and async routes |
| Runtime | Python | 3.11 | Backend language |
| HTTP client | httpx | 0.26.0 | Async external API calls |
| Containers | Docker Compose | 3.9 | Multi-service orchestration |
| CI/CD | GitHub Actions | — | Automated pytest on every push |
| Testing | pytest | 7.4.4 | Backend test suite |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Returns status ok and modules 9 |
| GET | /api/moltbook/feed | Proxies Moltbook.com and returns sanitized posts |
| POST | /api/moltbook/simulate | Generates 6 FinsecCorp attack steps from post content |
| POST | /api/moltbook/analyze | Returns objective, motivation, and execution plan |

Full interactive documentation at http://localhost:8000/docs when running locally.

---

## 🌿 Branching Strategy
└── feature/[name] <- individual feature development
└── develop <- default branch, all PRs merge here
main          <- protected, production-ready only
All code is merged into develop via a reviewed Pull Request linked to a GitHub Issue. Direct commits to main are not permitted.

---

## 🧪 Running Tests

```bash
docker exec csec4390-cf-backend-1 pytest /app/tests/test_all.py -v
```

Tests cover the health endpoint and all 9 module routers. CI runs automatically on every push via GitHub Actions.

---

## 📚 Documentation

Full documentation is in the GitHub Wiki:

| Wiki Page | Contents |
|-----------|----------|
| Home | Project overview and navigation |
| Project Overview and Problem Statement | Why this project exists and who it serves |
| Architecture and Tech Stack | System design, API docs, SimulationContext |
| Threat Module Descriptions | All 9 modules with MITRE mappings and playbooks |
| Moltbook Feed Integration | How the live feed and Simulate This Attack work |
| Customer Discovery and Business Model Canvas | 15 interviews, BMC v1 to v2, pivot analysis |
| Deployment Guide and Known Issues | Setup instructions and all known workarounds |

---

## 👤 Individual Contribution Summary

> CIS 4390.01 — Practicum in Cybersecurity | University of the Incarnate Word | Spring 2026
> This project was completed as a solo capstone by Caleb Flores.

| Team Member | Total Story Points Completed | Contribution % |
|-------------|------------------------------|----------------|
| Caleb Flores | 106 | 100.0% |
| **Team Total** | **106** | **100.0%** |

Story points tracked via GitHub Issues across 5 milestones covering 32 issues total. All issues visible on the Project Board.

---

## 📋 Academic Information

| Field | Value |
|-------|-------|
| Course | CIS 4390.01 Practicum in Cybersecurity |
| Institution | University of the Incarnate Word |
| Instructor | Dr. Gonzalo D. Parra |
| Semester | Spring 2026 |
| Student | Caleb Flores |
| Collaborators | gdparra-edu, cyberknowledge |

---

Built for CIS 4390 Capstone Spring 2026
