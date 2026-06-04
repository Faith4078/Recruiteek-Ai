# Recruiteek AI

> AI-powered interview prep platform with real-time voice simulation and structured performance feedback.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-orange?style=flat-square&logo=firebase)](https://firebase.google.com)
[![Vapi](https://img.shields.io/badge/Vapi-Voice%20AI-purple?style=flat-square)](https://vapi.ai)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Evaluation-4285F4?style=flat-square&logo=google)](https://deepmind.google/technologies/gemini)

---

## Overview

Recruiteek AI simulates real hiring interviews in the browser. The candidate speaks — the system listens, processes, evaluates, and returns structured feedback across three dimensions: **clarity**, **structure**, and **relevance**.

No text prompts. No passive reading. A full voice-driven interview loop that mirrors what actually happens in a technical or behavioral interview screen.

---

## Problem

Most interview prep tools are passive — flashcard-based, text-heavy, and disconnected from the actual interview experience. Candidates struggle with the real-time pressure of speaking clearly under evaluation. Recruiteek AI closes that gap by replicating the live interview environment end-to-end.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│                                                                 │
│   Next.js 15 App Router  ──►  Firebase Auth  ──►  Firestore    │
│                    │                                            │
│              Vapi SDK (WebRTC)                                  │
└────────────────────┼────────────────────────────────────────────┘
                     │ Real-time voice stream
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Vapi Voice Layer                         │
│                                                                 │
│   Turn detection  ──►  Silence handling  ──►  Response stream  │
└────────────────────┼────────────────────────────────────────────┘
                     │ Transcribed candidate response
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Evaluation Layer                            │
│                                                                 │
│   Google Gemini AI  ──►  Structured feedback (JSON)            │
│                          ├── Clarity score                      │
│                          ├── Structure score                    │
│                          └── Relevance score + notes           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Features

- **Voice-first interview flow** — candidate speaks naturally; no typing, no text fields
- **Real-time turn management** via Vapi — handles interruptions, silence detection, and response streaming
- **AI evaluation engine** — Google Gemini scores each response on clarity, structure, and relevance with actionable written feedback
- **Session persistence** — full interview history stored in Firestore per authenticated user
- **Auth** — Firebase Authentication with session management
- **Structured feedback UI** — post-interview breakdown with per-question scores and improvement notes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Auth & Database | Firebase Auth, Firestore |
| Voice AI | Vapi (WebRTC, turn detection, streaming) |
| AI Evaluation | Google Gemini |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## Local Development

**Prerequisites:** Node.js 18+, Firebase project, Vapi account, Google AI Studio API key

```bash
git clone https://github.com/faithoyewole/recruiteek-ai
cd recruiteek-ai
npm install
```

Copy the environment template and fill in your keys:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_VAPI_PUBLIC_KEY=
GEMINI_API_KEY=
```

```bash
npm run dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase project API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firestore project ID |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Vapi public key for WebRTC session init |
| `GEMINI_API_KEY` | Google Gemini API key (server-side only) |


---

## Evaluation Rubric

Gemini evaluates each candidate response against the original question across three axes:

| Dimension | What it measures |
|---|---|
| **Clarity** | How easy is the answer to follow? Is the language precise? |
| **Structure** | Does the response follow a logical format (e.g. STAR, problem-solution)? |
| **Relevance** | Does the answer directly address what was asked? |

Each dimension returns a numeric score plus a one-to-two sentence improvement note.

---

## Roadmap

- [ ] Role-specific question banks (frontend, backend, PM, data)
- [ ] Multi-round interview simulation (HR screen → technical → behavioral)
- [ ] Filler word detection and pacing analysis
- [ ] Comparative scoring across sessions
- [ ] Shareable feedback reports (PDF export)

---
