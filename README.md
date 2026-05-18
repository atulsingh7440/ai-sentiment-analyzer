# 📊 Sentiment Analyzer

> AI-powered sentiment analysis for customer conversations in **English, Hindi, and Hinglish**

Production-ready full-stack web application analyzing conversation transcripts using **Groq LLM (Llama 3.3 70B)** with clean architecture (UI → n8n → AI).

![Tech](https://img.shields.io/badge/React-18-blue) ![Tech](https://img.shields.io/badge/n8n-Workflow-orange) ![Tech](https://img.shields.io/badge/Groq-Llama_3.3-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌐 Live Demo

🔗 **App:** https://your-app.netlify.app (deploy following guide below)

**Login:** `admin` / `admin`

Upload any file from `examples/` folder to test.

---

## ✨ Features

- 🔐 Login authentication (basic auth)
- 📁 File upload (`.txt`, up to **500KB / ~50 pages**)
- 🧠 AI analysis powered by Groq Llama 3.3 70B
- 🌍 Multilingual: English, Hindi, Hinglish
- 📊 Interactive charts (pie, bar, line)
- 💭 Emotion detection (6 emotions)
- 📌 Topic extraction with sentiment
- 📈 KPIs: urgency, satisfaction, trend
- 📝 Auto-generated summary
- 🔢 Pagination for large conversations
- 🎚️ Sentiment filter tabs
- 📱 Fully responsive design

---

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   React UI  │ ───▶ │  n8n Webhook │ ───▶ │   Groq LLM   │
│  (Netlify)  │      │ (n8n Cloud)  │      │  (Llama 3.3) │
└─────────────┘      └──────────────┘      └──────────────┘
       ▲                                            │
       └────────────── JSON Response ◀──────────────┘
```

**Clean separation:**
- **UI** → Renders dashboard
- **n8n** → Orchestrates API calls
- **Groq** → AI analysis

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Charts | Recharts |
| Backend | n8n (workflow automation) |
| AI | Groq API (Llama 3.3 70B) |
| Hosting (Frontend) | Netlify |
| Hosting (Backend) | n8n Cloud |

---

## 🚀 Live Deployment Guide

Follow these steps to deploy a **live, shareable web app**.

### Step 1: Setup Groq API (Free)

1. Go to https://console.groq.com/keys
2. Sign up (free, no credit card)
3. Create API key → Copy it (starts with `gsk_...`)

### Step 2: Deploy Backend on n8n Cloud (Free)

1. Sign up at https://app.n8n.cloud (free tier)
2. Click **Workflows → Import from File**
3. Upload `n8n/workflow.json`
4. Add Groq API key:
   - **Settings → Variables → Add Variable**
   - Name: `GROQ_API_KEY`
   - Value: `gsk_your_key_here`
5. Click **Activate** (toggle in top right)
6. Click the **Webhook** node → Copy **Production URL**
   - Format: `https://your-workspace.app.n8n.cloud/webhook/sentiment`

### Step 3: Deploy Frontend on Netlify (Free)

**Option A: Drag & Drop (Fastest)**

```bash
# Local build
npm install
npm run build
```

1. Go to https://app.netlify.com/drop
2. Drag the `dist/` folder
3. Get instant URL: `https://random-name.netlify.app`
4. Go to **Site settings → Environment variables**
5. Add: `VITE_N8N_WEBHOOK_URL` = your n8n webhook URL
6. Trigger redeploy

**Option B: Connect GitHub (Recommended for Updates)**

1. Push code to GitHub
2. On Netlify: **Add new site → Import from Git**
3. Select your repo
4. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable: `VITE_N8N_WEBHOOK_URL`
6. Deploy

### Step 4: Share Your Live App

🎉 Your app is live at: `https://your-app.netlify.app`

**Share this URL** for testing. Evaluators only need:
- Browser
- The URL
- Login: `admin/admin`
- Sample `.txt` file (or use examples)

---

## 💻 Local Development

```bash
# 1. Clone & install
git clone https://github.com/your-username/sentiment-analyzer.git
cd sentiment-analyzer
npm install

# 2. Configure
cp .env.example .env
# Edit .env with your n8n webhook URL

# 3. Run
npm run dev
```

Visit http://localhost:3000

---

## 📁 Project Structure

```
sentiment-analyzer/
├── src/
│   ├── App.jsx                       # Root component
│   ├── main.jsx                      # Entry point
│   ├── index.css                     # Global styles
│   ├── pages/
│   │   ├── LoginPage.jsx             # Authentication
│   │   └── DashboardPage.jsx         # Main dashboard
│   └── components/
│       ├── FileUpload.jsx            # File upload UI
│       ├── ResultsDashboard.jsx      # Results orchestrator
│       ├── SentimentBadge.jsx        # Overall sentiment
│       ├── SentenceBreakdown.jsx     # Paginated sentence list
│       ├── TopicSentiment.jsx        # Topic breakdown
│       ├── EmotionDetection.jsx      # Emotion bars
│       ├── Charts.jsx                # Visualizations
│       └── ConversationSummary.jsx   # Summary & KPIs
├── n8n/
│   └── workflow.json                 # n8n workflow (import this)
├── examples/                         # Sample conversations
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

The app efficiently handles conversations up to **~50 pages**:

| File Size | Approx. Pages | Handling |
|-----------|---------------|----------|
| < 200KB | < 20 pages | Direct processing |
| 200-500KB | 20-50 pages | Direct processing + pagination UI |
| > 500KB | > 50 pages | Rejected (frontend validation) |

**Optimizations for large files:**
- Frontend pagination (25 sentences per page)
- Sentiment filter tabs (focus on positive/negative)
- Backend pre-processing (token limit safety)
- Groq's Llama 3.3 70B has 128K context (handles full input)
- Charts aggregate data (always performant)

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
    "Customer_Support": { "sentiment": "POSITIVE", "mentions": 2 }
  },
  "emotions": {
    "joy": 0.85,
    "anger": 0.05,
    "frustration": 0.10,
    "satisfaction": 0.90,
    "sadness": 0.02,
    "fear": 0.01
  }
}
```

---

## 🧪 Testing

5 sample conversations provided in `examples/`:

| File | Language | Scenario |
|------|----------|----------|
| `1-telecom-positive.txt` | English | Happy customer feedback |
| `2-billing-complaint.txt` | English | Resolved billing dispute |
| `3-hindi-network-issue.txt` | Hindi | Network outage complaint |
| `4-hinglish-plan-issue.txt` | Hinglish | Plan change dispute |
| `5-hinglish-positive.txt` | Hinglish | Positive with suggestions |

---

## 🔧 Troubleshooting

**"n8n webhook URL not configured"**
→ Set `VITE_N8N_WEBHOOK_URL` in `.env` (local) or Netlify environment variables (deployed)

**"Server returned 500"**
→ Check `GROQ_API_KEY` is set in n8n environment variables

**"Server returned 404"**
→ Make sure n8n workflow is **activated** (toggle on)

**"CORS error"**
→ Workflow JSON includes CORS headers; re-import if you see this

**"File too large" error**
→ Max 500KB. Split larger files or trim conversation

**Port 3000 in use**
→ Run `npm run dev -- --port 3001`

---

## 📦 Build for Production

```bash
npm run build       # Creates optimized dist/ folder
npm run preview     # Preview production build locally
```

The `dist/` folder is ready to deploy on any static host (Netlify, Vercel, S3, etc.)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) file

---

## 👤 Author

**Atul Singh**

Built as a demonstration of full-stack AI engineering with modern tools.

---

**Made with ❤️ using React, n8n, and Groq**
#   a i - s e n t i m e n t - a n a l y z e r  
 