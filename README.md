# Muhammed Muhasin — ML Engineer Portfolio

> Production-grade portfolio showcasing RAG Systems, MLOps pipelines, and AI engineering. Built with React 19, Express, Tailwind CSS v4, and Gemini AI integration.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development](#development)
  - [Production Build](#production-build)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Customization](#customization)
- [Scripts](#scripts)
- [License](#license)

---

## Overview

A modern, responsive portfolio website for **Muhammed Muhasin**, ML Engineer specializing in **RAG Systems** and **MLOps**. Features an interactive AI assistant powered by Google Gemini, live GitHub contributions graph, project showcases, and a polished dark-themed UI with smooth animations.

**Live Demo**: [Deploy to Render/Fly.io/Vercel](#deployment)

---

## Features

### Core Sections
- **Hero** — Animated typography with embedded portrait, scroll indicator
- **About** — Philosophy cards, core statistics, professional summary
- **Experience** — Timeline with detailed roles, achievements, and tech tags
- **Projects** — Filterable project cards with GitHub links and live demos
- **Tech Stack** — Categorized skills (ML/AI, MLOps, Engineering, Foundations, Deployment)
- **GitHub Contributions** — Live heatmap fetched from GitHub profile
- **Contact** — Functional form with server-side validation
- **Footer** — Social links, resume download, email

### Interactive Features
- **Gemini AI Assistant** — Chat with an AI twin trained on portfolio context (system instructions include full bio, projects, experience, tech stack)
- **Smooth Scroll** — Lenis-powered smooth scrolling with scroll-triggered animations
- **Motion Animations** — Framer Motion (motion/react) for staggered reveals, hover effects, ambient glows
- **Responsive Design** — Mobile-first, breakpoints at 640px, 768px, 1024px, 1280px
- **Dark Theme** — Custom CSS variables via Tailwind v4, consistent color system

### API Endpoints (Express)
| Route | Method | Description |
|-------|--------|-------------|
| `/api/gemini/chat` | POST | AI chat with conversation history |
| `/api/contact` | POST | Contact form submission |
| `/api/github-contributions` | GET | Scrapes GitHub contributions calendar |

---

## Tech Stack

### Frontend
| Category | Technologies |
|----------|--------------|
| Framework | React 19, TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`), CSS Variables |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Smooth Scroll | Lenis |
| Linting | TypeScript (`tsc --noEmit`) |

### Backend
| Category | Technologies |
|----------|--------------|
| Server | Express 4.21 |
| AI SDK | `@google/genai` (Gemini 1.5 Flash) |
| Env Management | dotenv |
| Runtime | tsx (TypeScript execution) |
| Bundling | esbuild (server bundle) |

### Development
- **Package Manager**: npm
- **Node Version**: 18+ (tested on 20, 22, 24)
- **TypeScript**: Strict mode, ESNext modules

---

## Project Structure

```
itsmuhasin/
├── public/                    # Static assets (served at root)
│   └── profile-illustration.png
├── src/
│   ├── assets/images/         # Project preview images (imported in components)
│   │   ├── paperlens_preview_*.jpg
│   │   ├── churnguard_preview_*.jpg
│   │   ├── bergie_preview_*.jpg
│   │   ├── robostock_preview_*.jpg
│   │   └── profile_illustration_*.jpg
│   ├── components/            # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── TechStack.tsx
│   │   ├── GithubContributions.tsx
│   │   ├── Contact.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AiAssistant.tsx
│   │   └── StayConnected.tsx
│   ├── data.ts                # Portfolio data (projects, experience, tech, stats)
│   ├── types.ts               # TypeScript interfaces
│   ├── index.css              # Global styles, Tailwind imports, CSS variables
│   ├── main.tsx               # React entry point
│   └── App.tsx                # Root component, layout composition
├── server.ts                  # Express server + API routes + Vite middleware
├── vite.config.ts             # Vite config (React, Tailwind, path aliases)
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies, scripts
├── package-lock.json
├── .env.example               # Environment template
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org) or use `nvm`/`fnm`
- **npm** (included with Node.js)
- **Git** (for cloning)
- **Gemini API Key** — Get free at [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/itsmuhasin.git
cd itsmuhasin

# Install dependencies
npm install
```

### Environment Variables

```bash
# Copy template
cp .env.example .env
```

Edit `.env` with your values:

```env
# Required for AI Assistant
GEMINI_API_KEY=your_gemini_api_key_here

# Production URL (set automatically on Render/Fly.io)
APP_URL=http://localhost:3000

# Contact form email delivery (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=Portfolio <contact@your-verified-domain.com>
CONTACT_EMAIL=muhasin.code@gmail.com
```

> **Note**: The AI Assistant (`/api/gemini/chat`) requires `GEMINI_API_KEY`. The contact form requires a Resend API key and a sender address on a domain verified with Resend. Set these variables in your deployment environment as well.

### Development

```bash
# Start dev server (frontend + backend on port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**What runs**:
- Vite dev server with HMR (React frontend)
- Express server with API routes (`/api/*`)
- Single port — no proxy needed

### Production Build

```bash
# Build frontend + bundle server
npm run build

# Output: dist/ (client assets) + dist/server.cjs (bundled server)
```

```bash
# Run production server
npm start
```

**Build process**:
1. `vite build` → `dist/` (static assets, `index.html`)
2. `esbuild server.ts` → `dist/server.cjs` (bundled Express server)

---

## API Routes

### `POST /api/gemini/chat`

Chat with the AI assistant.

**Request**:
```json
{
  "message": "What projects have you built?",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! I'm Muhasin's AI twin..." }
  ]
}
```

**Response**:
```json
{ "reply": "I've built PaperLens, ChurnGuard AI, Bergie, and RoboStock..." }
```

**Requires**: `GEMINI_API_KEY` in environment.

---

### `POST /api/contact`

Submit contact form.

The server sends the inquiry to `CONTACT_EMAIL` (defaults to `muhasin.code@gmail.com`) through Resend. The sender must be configured using `CONTACT_FROM_EMAIL` and verified with Resend; `RESEND_API_KEY` is required.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration",
  "message": "Interested in working together..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you, John! Your inquiry has been received..."
}
```

---

### `GET /api/github-contributions`

Fetch GitHub contributions heatmap.

**Query Params**:
- `username` (optional, default: `muhasin-code`)

**Response**:
```json
{
  "success": true,
  "total": 1234,
  "days": [
    { "date": "2026-01-15", "level": 2, "count": 4 },
    { "date": "2026-01-16", "level": 1, "count": 1 }
  ]
}
```

---

## Deployment

### Option 1: Render (Recommended — Easiest)

1. Push to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Env Vars**: Add `GEMINI_API_KEY`, `NODE_ENV=production`
5. Deploy → Free tier (spins down after 15 min inactivity)

### Option 2: Fly.io (Better Performance)

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Launch (creates fly.toml)
fly launch

# Set secrets
fly secrets set GEMINI_API_KEY=your_key

# Deploy
fly deploy
```

**Free allowance**: 3 shared-cpu-1x VMs, 160GB transfer/month

### Option 3: Railway

```bash
npm i -g @railway/cli
railway login
railway init
railway add --env GEMINI_API_KEY=your_key
railway up
```

### Option 4: Vercel (Requires Refactor)

Convert Express routes to serverless functions in `api/`:
```
api/
├── gemini-chat.ts
├── contact.ts
└── github-contributions.ts
```
Then deploy as static + functions.

### Option 5: Docker (Any VPS/Cloud Run)

**Dockerfile**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t itsmuhasin .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key itsmuhasin
```

---

## Customization

### Portfolio Data (`src/data.ts`)

Update these constants:
```typescript
export const GITHUB_USERNAME = "your-github-username";
export const RESUME_URL = "/resume.pdf";
export const LINKEDIN_URL = "https://linkedin.com/in/your-profile";
export const EMAIL_ADDRESS = "your@email.com";
```

Edit arrays:
- `PROJECTS` — Add/remove projects
- `EXPERIENCES` — Update work history
- `TECH_ITEMS` — Modify skill categories/levels
- `STATS` — Update counter values

### Images

| Image | Location | Usage |
|-------|----------|-------|
| Portrait | `public/profile-illustration.png` | Hero, About |
| Project previews | `src/assets/images/*.jpg` | Project cards (import in `data.ts`) |

**To add project images**: Place in `src/assets/images/`, import in `data.ts`:
```typescript
import myProjectImg from '../assets/images/my-project.jpg';
export const MY_PROJECT_IMAGE = myProjectImg;
```

### Theme Colors (`src/index.css`)

CSS variables define the color system:
```css
:root {
  --color-bg: #0a0a0f;
  --color-sec-bg: #111118;
  --color-card: #181820;
  --color-border: #2a2a3a;
  --color-text: #f0f0f5;
  --color-sec-text: #a0a0b0;
  --color-muted: #6a6a7a;
  --color-brand: #00d4aa;  /* Primary accent */
  --color-brand-hover: #00e8bb;
}
```

### AI System Prompt (`server.ts`)

Modify `SYSTEM_INSTRUCTION` constant to change AI personality/knowledge.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (tsx + Vite middleware) |
| `npm run build` | Production build (Vite + esbuild) |
| `npm start` | Run production server (`node dist/server.cjs`) |
| `npm run clean` | Remove `dist/` and `server.js` |
| `npm run lint` | Type-check (`tsc --noEmit`) |

---

## Project Highlights (from Portfolio)

| Project | Category | Description |
|---------|----------|-------------|
| **PaperLens** | ML/AI | Production RAG over arXiv: ChromaDB, hybrid retrieval (BM25 + dense), cross-encoder reranking, QLoRA Qwen2.5-3B, Langfuse + Ragas CI gating |
| **ChurnGuard AI** | MLOps | End-to-end telecom churn pipeline (50K rows): XGBoost, MLflow, DVC, Great Expectations, Prefect, Feast, FastAPI, Docker |
| **Bergie** | ML/AI | Multi-channel sales agent in production: Claude API, FastAPI, PostgreSQL, Redis |
| **RoboStock** | Engineering | Inventory management: Django, PostgreSQL |

---

## License

MIT License — feel free to use as a template for your own portfolio.

---

## Author

**Muhammed Muhasin**  
ML Engineer | RAG Systems & MLOps  
📧 muhasin.code@gmail.com  
🔗 [GitHub](https://github.com/muhasin-code) · [LinkedIn](https://linkedin.com/in/muhasin-code) · [Upwork](https://upwork.com/freelancers/~01716acc78c5c3ab17)

---

*Built with discipline, deployed with intent.*