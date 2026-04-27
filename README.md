# DivyangSahay

An AI-powered platform that helps persons with disabilities in India discover and access government benefits. Users answer a few profile questions and the system matches them to eligible schemes, generates application drafts, and locates nearby service centers — all in 6 Indian languages.

## What It Does

- **Eligibility Matching** — Matches users to government schemes based on disability type/percentage, income, age, state, and education.
- **Application Drafts** — Generates pre-filled applications with document checklists and step-by-step submission instructions.
- **CSC Locator** — Interactive map to find the nearest Common Service Center with distance, address, and available services.
- **Multilingual Support** — Full UI translation in English, Hindi, Tamil, Telugu, Bengali, and Marathi.
- **AI Chatbot** — Natural-language Q&A assistant powered by Google Gemini for answering questions about schemes, documents, and rights.
- **Voice Assistant** — Speech-to-text and text-to-speech interface for visually impaired users with voice navigation commands.
- **Accessibility** — High contrast mode, adjustable font size, keyboard navigation, and screen reader support (WCAG 2.1 AA).

## Tech Stack

- **React 19** with React Router v6
- **Vite 5** for build tooling
- **Tailwind CSS 3** for styling
- **Google Gemini 2.0 Flash** for AI features
- **Leaflet** for interactive maps
- **Web Speech API** for voice input/output

## Getting Started

```bash
# Install dependencies
npm install

# Copy env template and add your Gemini API key
cp .env.example .env

# Start dev server
npm run dev
```

Opens at `http://localhost:5173`. Works without an API key — the chatbot and voice assistant fall back to built-in responses.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey)). Optional — fallback responses are used without it. |

## Project Structure

```
src/
├── components/    # UI components (Header, Chatbot, VoiceAssistant, etc.)
├── context/       # React Context (App state, Language, Theme)
├── data/          # Schemes, CSC centers, translations, state lists
├── pages/         # Route pages (Home, EligibilityCheck, Results, CSCLocator, About)
├── services/      # AI service layer (Gemini integration + fallbacks)
└── utils/         # Eligibility logic, local storage helpers
```

## Build

```bash
npm run build
npm run preview
```
