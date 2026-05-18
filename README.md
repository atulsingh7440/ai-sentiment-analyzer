<div align="center">

# 📊 Sentiment Analyzer

### AI-powered sentiment analysis for customer conversations

**English · Hindi · Hinglish**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![n8n](https://img.shields.io/badge/n8n-Workflow-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-F55036?style=for-the-badge)](https://groq.com)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🔗 Live Demo](https://your-app.netlify.app) · [📁 Examples](#-testing) · [🚀 Deploy Guide](#-live-deployment-guide)

</div>

---

## 🌟 Overview

A production-ready full-stack web application that analyzes conversation transcripts using **Groq LLM (Llama 3.3 70B)**. Built with a clean, decoupled architecture:

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   React UI  │ ───▶ │  n8n Webhook │ ───▶ │   Groq LLM   │
│  (Netlify)  │      │ (n8n Cloud)  │      │  (Llama 3.3) │
└─────────────┘      └──────────────┘      └──────────────┘
       ▲                                            │
       └────────────── JSON Response ◀──────────────┘
```

> **Login:** `admin` / `admin` — Upload any file from `examples/` folder to test.

---

## ✨ Features

| Category | Features |
|---|---|
| 🔐 **Auth** | Basic login authentication |
| 📁 **Input** | `.txt` file upload up to **500KB (~50 pages)** |
| 🧠 **AI Engine** | Groq Llama 3.3 70B (128K context window) |
| 🌍 **Languages** | English, Hindi, Hinglish |
| 📊 **Charts** | Interactive pie, bar & line visualizations |
| 💭 **Emotions** | 6-emotion detection (joy, anger, fear, sadness, satisfaction, frustration) |
| 📌 **Topics** | Automatic topic extraction with per-topic sentiment |
| 📈 **KPIs** | Urgency level · Satisfaction score · Sentiment trend |
| 📝 **Summary** | Auto-generated conversation summary |
| 🔢 **UX** | Pagination (25/page) + sentiment filter tabs |
| 📱 **Design** | Fully responsive |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite |
| **Charts** | Recharts |
| **Backend / Orchestration** | n8n (workflow automation) |
| **AI Model** | Groq API — Llama 3.3 70B |
| **Hosting (Frontend)** | Netlify |
| **Hosting (Backend)** | n8n Cloud |

---

## 🚀 Live Deployment Guide

### Step 1 — Setup Groq API *(Free)*

1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up — no credit card required
3. Create an API key → copy it (starts with `gsk_...`)

---

### Step 2 — Deploy Backend on n8n Cloud *(Free)*

1. Sign up at [app.n8n.cloud](https://app.n8n.cloud) (free tier)
2. Click **Workflows → Import from File**
3. Upload `n8n/workflow.json`
4. Add your Groq API key:
   - Navigate to **Settings → Variables → Add Variable**
   - **Name:** `GROQ_API_KEY`
   - **Value:** `gsk_your_key_here`
5. Click **Activate** (toggle in the top right)
6. Click the **Webhook** node → copy the **Production URL**
   > Format: `https://your-workspace.app.n8n.cloud/webhook/sentiment`

---

### Step 3 — Deploy Frontend on Netlify *(Free)*

**Option A — Drag & Drop (Fastest)**

```bash
npm install
npm run build
```

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `dist/` folder onto the page
3. Get your instant URL: `https://random-name.netlify.app`
4. Go to **Site settings → Environment variables** and add:
   ```
   VITE_N8N_WEBHOOK_URL = <your n8n webhook URL>
   ```
5. Trigger a redeploy

**Option B — Connect GitHub *(Recommended for ongoing updates)***

1. Push this repo to GitHub
2. On Netlify: **Add new site → Import from Git**
3. Select your repository
4. Build settings (auto-detected):

   | Setting | Value |
   |---|---|
   | Build command | `npm run build` |
   | Publish directory | `dist` |

5. Add environment variable: `VITE_N8N_WEBHOOK_URL`
6. Click **Deploy**

---

### Step 4 — Share 🎉

Your app is live at `https://your-app.netlify.app`

Share the URL — evaluators only need a browser, login credentials (`admin/admin`), and a sample `.txt` file.

---

## 💻 Local Development

```bash
# 1. Clone & install
git clone https://github.com/your-username/sentiment-analyzer.git
cd sentiment-analyzer
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env — add your n8n webhook URL

# 3. Start dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
sentiment-analyzer/
├── src/
│   ├── App.jsx                        # Root component
│   ├── main.jsx                       # Entry point
│   ├── index.css                      # Global styles
│   ├── pages/
│   │   ├── LoginPage.jsx              # Authentication
│   │   └── DashboardPage.jsx          # Main dashboard
│   └── components/
│       ├── FileUpload.jsx             # File upload UI
│       ├── ResultsDashboard.jsx       # Results orchestrator
│       ├── SentimentBadge.jsx         # Overall sentiment
│       ├── SentenceBreakdown.jsx      # Paginated sentence list
│       ├── TopicSentiment.jsx         # Topic breakdown
│       ├── EmotionDetection.jsx       # Emotion bars
│       ├── Charts.jsx                 # Visualizations
│       └── ConversationSummary.jsx    # Summary & KPIs
├── n8n/
│   └── workflow.json                  # n8n workflow (import this)
├── examples/                          # Sample conversations
│   ├── 1-telecom-positive.txt
│   ├── 2-billing-complaint.txt
│   ├── 3-hindi-network-issue.txt
│   ├── 4-hinglish-plan-issue.txt
│   └── 5-hinglish-positive.txt
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── LICENSE
└── README.md
```

---

## 📏 Large File Handling

| File Size | Approx. Pages | Handling |
|---|---|---|
| < 200 KB | < 20 pages | Direct processing |
| 200 – 500 KB | 20 – 50 pages | Direct processing + pagination UI |
| > 500 KB | > 50 pages | ❌ Rejected (frontend validation) |

**Optimizations:**
- Frontend pagination — 25 sentences per page
- Sentiment filter tabs for focused review
- Backend pre-processing with token limit safety
- Groq Llama 3.3 70B supports a 128K context window
- Charts always aggregate data for smooth performance

---

## 📡 API Response Format

```json
{
  "overall_sentiment": "POSITIVE",
  "confidence": 0.92,
  "language_detected": "ENGLISH",
  "satisfaction_score": 88,
  "urgency_level": "LOW",
  "sentiment_trend": "Consistently positive",
  "summary": "Customer is highly satisfied...",
  "sentences": [
    {
      "text": "I'm very happy with the service",
      "sentiment": "POSITIVE",
      "confidence": 0.95
    }
  ],
  "topics": {
    "Network_Connectivity": { "sentiment": "POSITIVE", "mentions": 3 },
    "Customer_Support":     { "sentiment": "POSITIVE", "mentions": 2 }
  },
  "emotions": {
    "joy":          0.85,
    "anger":        0.05,
    "frustration":  0.10,
    "satisfaction": 0.90,
    "sadness":      0.02,
    "fear":         0.01
  }
}
```

---

## 🧪 Testing

Five sample conversations are provided in `examples/`:

| File | Language | Scenario |
|---|---|---|
| `1-telecom-positive.txt` | English | Happy customer feedback |
| `2-billing-complaint.txt` | English | Resolved billing dispute |
| `3-hindi-network-issue.txt` | Hindi | Network outage complaint |
| `4-hinglish-plan-issue.txt` | Hinglish | Plan change dispute |
| `5-hinglish-positive.txt` | Hinglish | Positive feedback with suggestions |

---

## 🔧 Troubleshooting

| Error | Fix |
|---|---|
| `"n8n webhook URL not configured"` | Set `VITE_N8N_WEBHOOK_URL` in `.env` (local) or Netlify environment variables |
| `"Server returned 500"` | Verify `GROQ_API_KEY` is set in n8n environment variables |
| `"Server returned 404"` | Make sure the n8n workflow is **activated** |
| `"CORS error"` | Re-import `workflow.json` — it includes the required CORS headers |
| `"File too large"` | Max 500 KB. Split the file or trim the conversation |
| Port 3000 in use | Run `npm run dev -- --port 3001` |

---

## 📦 Production Build

```bash
npm run build      # Creates optimized dist/ folder
npm run preview    # Preview the production build locally
```

The `dist/` folder is ready to deploy on any static host — Netlify, Vercel, S3, GitHub Pages, etc.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

## 👤 Author

**Atul Singh**

Built as a demonstration of full-stack AI engineering with modern tools.

---

*Made with ❤️ using React, n8n, and Groq*

</div>
