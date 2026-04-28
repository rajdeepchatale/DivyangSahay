# DivyangSahay

**AI-Powered Benefit Assistant for Persons with Disabilities in India**

DivyangSahay bridges the gap between India's 26 million persons with disabilities and the government benefits they are entitled to. Nearly 70% of disability benefits go unclaimed every year due to complex eligibility rules, language barriers, and inaccessible application processes. This platform uses AI to simplify that entire journey — from discovering schemes to submitting applications.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

**Eligibility Matching**
Matches users to government schemes based on disability type, disability percentage, income, age, state, and education level. Provides clear reasons for why a user qualifies.

**Application Draft Generator**
Generates pre-filled application forms with document checklists and step-by-step submission instructions for each matched scheme.

**Multilingual Support**
Full interface translation across 6 languages — English, Hindi, Tamil, Telugu, Bengali, and Marathi. Context-aware translations, not literal word-for-word.

**CSC Locator**
Interactive map powered by Leaflet that locates the nearest Common Service Centers with address, contact details, distance, and available services.

**AI Chatbot**
Natural-language Q&A assistant powered by Google Gemini. Trained with comprehensive knowledge of all 21 disability types under the RPwD Act 2016, government schemes, required documents, and legal rights.

**Voice Assistant**
Full speech-based interaction using the Web Speech API. Supports voice commands for navigation, accessibility controls, and conversational queries — designed for visually impaired users.

**Document Verification**
Simulated OCR-powered document validation that checks uploaded documents for completeness and correctness before submission.

**Accessibility**
Built with accessibility-first principles:
- WCAG 2.1 AA compliance
- Full keyboard navigation
- High contrast mode
- Adjustable font size
- Screen reader support

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Routing | React Router v6 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| AI | Google Gemini 2.0 Flash |
| Maps | Leaflet + React-Leaflet |
| Voice | Web Speech API |
| Typography | Montserrat, Open Sans |
| Icons | Font Awesome 6 |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
git clone https://github.com/rajdeepchatale/DivyangSahay.git
cd DivyangSahay
npm install
```

### Running Locally

```bash
cp .env.example .env
# Add your Gemini API key to .env (optional)

npm run dev
```

The app runs at `http://localhost:5173`.

> The platform works without a Gemini API key. The chatbot and voice assistant use built-in fallback responses when no key is configured.

---

## Environment Variables

Create a `.env` file in the root directory (use `.env.example` as a template):

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | No | Google Gemini API key. Get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey). If not provided, the app uses intelligent fallback responses. |

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccessibilityToolbar.jsx
│   ├── AnimateOnScroll.jsx
│   ├── BenefitCard.jsx
│   ├── Chatbot.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── LoadingSpinner.jsx
│   ├── NotificationPanel.jsx
│   ├── StatsCard.jsx
│   ├── Toast.jsx
│   └── VoiceAssistant.jsx
├── context/             # React Context providers
│   ├── AppContext.jsx
│   ├── LanguageContext.jsx
│   └── ThemeContext.jsx
├── data/                # Static data and translations
│   ├── cscCenters.js
│   ├── profileData.js
│   ├── schemes.js
│   ├── states.js
│   └── translations.js
├── pages/               # Route-level page components
│   ├── About.jsx
│   ├── ApplicationDraft.jsx
│   ├── CSCLocator.jsx
│   ├── EligibilityCheck.jsx
│   ├── Home.jsx
│   └── Results.jsx
├── services/            # External service integrations
│   └── aiService.js
├── utils/               # Helper functions
│   ├── eligibility.js
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Usage

1. Open the app and navigate to **Check Eligibility**.
2. Fill in the profile form — age, disability type, disability percentage, income, state, and education.
3. The AI engine evaluates your profile against all government schemes and shows matching results with benefit amounts and qualification reasons.
4. Generate a pre-filled application draft for any matched scheme.
5. Use the **CSC Locator** to find the nearest help center for submitting your application.
6. Use the chatbot or voice assistant at any time to ask questions about schemes, documents, or rights.

---

## Deployment

### Vercel

```bash
npm run build
```

The project is configured for Vercel out of the box. Import the GitHub repository on [vercel.com](https://vercel.com), add `VITE_GEMINI_API_KEY` as an environment variable, and deploy.

### Other Platforms

Any static hosting platform that supports single-page applications will work. The build output is in the `dist/` directory.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- **RPwD Act 2016** — The Rights of Persons with Disabilities Act that defines 21 disability types and the legal framework this platform builds upon.
- **Google Gemini** — Powers the AI chatbot and voice assistant with natural language understanding.
- **Common Service Centers (CSC)** — Government-authorized digital service points that enable last-mile benefit delivery.
- Built with ❤️ by Anay Malichkar, Yash Patil, and Rajdeep Chatale.
