# ♿ DivyangSahay — AI-Powered Benefit Assistant for Persons with Disabilities

> **Empowering 26 Million Indians with Access to Rights & Benefits**

DivyangSahay is an AI-powered platform that helps persons with disabilities (Divyangjan) in India discover, understand, and apply for government schemes and benefits. Built with **8 specialized AI agents**, it simplifies the entire journey — from eligibility matching to application submission — in **6 Indian languages**.

🔗 **Live Demo:** [divyangsahay.vercel.app](https://divyangsahay.vercel.app)

---

## 🚀 Features

### 🤖 8 AI Agents

| # | Agent | Type | Description |
|---|-------|------|-------------|
| 1 | **Eligibility Matching** | Core | Multi-criteria AI matching based on disability %, income, age, state, and education |
| 2 | **Application Draft Generator** | Core | Auto-generates pre-filled application forms with document checklists |
| 3 | **Multi-Language Translation** | Core | Context-aware translation in 6 languages (English, Hindi, Tamil, Telugu, Bengali, Marathi) |
| 4 | **CSC Locator & Navigation** | Core | Interactive map to find nearest Common Service Centers with distance and services |
| 5 | **Document Verification** | Advanced | Validates uploaded documents for completeness and correctness |
| 6 | **Notification & Reminder** | Advanced | Deadline alerts and status update notifications |
| 7 | **Q&A Support Chatbot** | Advanced | Natural-language chatbot powered by Google Gemini AI for 24/7 assistance |
| 8 | **Voice Assistant** | Advanced | Full voice-based interaction with Speech-to-Text and Text-to-Speech for visually impaired users |

### ♿ Accessibility-First Design
- **WCAG 2.1 AA** compliant
- Full **keyboard navigation**
- **High contrast mode** toggle
- **Screen reader** ready
- **Adjustable font size** controls
- **Voice commands** for hands-free navigation

### 🇮🇳 Government Schemes Covered
- IGNDPS (Disability Pension)
- ADIP (Free Assistive Devices)
- UDID (Unique Disability Identity Card)
- Scholarships for Students with Disabilities
- Railway & Travel Concessions
- NHFDC Self-Employment Loans
- DDRS (Rehabilitation & Training)
- State-Level Disability Pensions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router v6 |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **AI Engine** | Google Gemini 2.0 Flash (`@google/generative-ai`) |
| **Maps** | Leaflet + React-Leaflet |
| **Voice** | Web Speech API (Speech Recognition + Speech Synthesis) |
| **Fonts** | Montserrat, Open Sans (Google Fonts) |
| **Icons** | Font Awesome 6 |

---

## 📁 Project Structure

```
DivyangSahay/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AccessibilityToolbar.jsx
│   │   ├── AnimateOnScroll.jsx
│   │   ├── BenefitCard.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── NotificationPanel.jsx
│   │   ├── StatsCard.jsx
│   │   ├── Toast.jsx
│   │   └── VoiceAssistant.jsx
│   ├── context/             # React Context providers
│   │   ├── AppContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/                # Static data & translations
│   │   ├── cscCenters.js
│   │   ├── profileData.js
│   │   ├── schemes.js
│   │   ├── states.js
│   │   └── translations.js
│   ├── pages/               # Route pages
│   │   ├── About.jsx
│   │   ├── ApplicationDraft.jsx
│   │   ├── CSCLocator.jsx
│   │   ├── EligibilityCheck.jsx
│   │   ├── Home.jsx
│   │   └── Results.jsx
│   ├── services/            # AI service layer
│   │   └── aiService.js
│   ├── utils/               # Utility functions
│   │   ├── eligibility.js
│   │   └── storage.js
│   ├── App.jsx              # Root component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variable template
├── index.html               # HTML entry point
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── eslint.config.js
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** 9+
- A **Google Gemini API key** (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/rajdeepchatale/DivyangSahay.git
cd DivyangSahay

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key
```

### Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** The app works without an API key too — it uses intelligent fallback responses for the chatbot and voice assistant when no key is configured.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI features | Optional (fallback responses are used without it) |

---

## 🌐 Deployment

The project is deployed on **Vercel**. To deploy your own instance:

1. Push the code to a GitHub repository
2. Import the repo on [vercel.com](https://vercel.com)
3. Add `VITE_GEMINI_API_KEY` as an environment variable
4. Deploy — Vercel auto-detects Vite configuration

---

## 👥 Team Paradox

Built with ❤️ for the hackathon by **Team Paradox**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
