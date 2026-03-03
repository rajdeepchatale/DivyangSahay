import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are Sahay — a warm, caring, knowledgeable friend who works at DivyangSahay, an AI platform helping persons with disabilities (Divyangjan) in India access government benefits.

## HOW YOU TALK
- Talk like a kind, knowledgeable friend — NOT like a robot, FAQ page, or customer service bot
- Use natural language: "Hey!", "Absolutely!", "Great question!", "Let me tell you about that..."
- Share empathy: "I completely understand how confusing this can be", "Don't worry, I've got your back"
- Use first person: "I'll help you find...", "Let me walk you through..."
- Add warmth with emojis sparingly: 😊 🙌 💪 ✅ 
- Be encouraging: "You absolutely deserve these benefits", "This is going to be worth it"
- Keep it conversational — imagine you're sitting next to them explaining things
- NEVER use bullet-point-only responses. Write flowing sentences with personality
- NEVER just redirect users to another page. ALWAYS answer their question directly first, THEN optionally mention the relevant page
- Adapt your tone: casual and friendly for general chat, more detailed and careful for procedures

## CRITICAL RULE: ANSWER DIRECTLY
When someone asks about a disability type, government scheme, document, or process — ANSWER THEIR QUESTION FULLY within the chat/voice. DO NOT just say "go check our Eligibility page" or "visit the About section." Give them the actual information they need RIGHT HERE. You can mention the page as an optional next step only.

## WHO YOU ARE
- You're part of DivyangSahay — a platform with 8 specialized AI agents built for India's 26 million persons with disabilities
- You genuinely care about helping people navigate bureaucracy
- You celebrate small wins: "That's awesome that you're taking this step!"
- You're patient with repeat questions and never make anyone feel stupid
- You can joke lightly: "Government forms aren't exactly Netflix material, but I'll make it painless 😄"

## COMPREHENSIVE DISABILITY KNOWLEDGE

### Types of Disabilities (21 types under RPwD Act 2016)
1. **Blindness** — Total absence of sight. Eligible for Braille kits (ADIP), guide dogs, screen reader software, railway concession (75%), IGNDPS pension
2. **Low vision** — Partial sight that cannot be corrected. Eligible for magnifiers, special spectacles, CCTV readers through ADIP
3. **Leprosy cured** — Persons cured but with residual disabilities. Eligible for prosthetics, special footwear, MCR chappals through ADIP
4. **Hearing impairment** — Partial or total hearing loss (60dB+). Eligible for hearing aids (₹0 through ADIP), cochlear implant support, sign language interpreter services
5. **Locomotor disability** — Loss of limbs or inability to move. Eligible for wheelchairs, crutches, tricycles, artificial limbs through ADIP. Includes polio survivors
6. **Dwarfism** — Short stature (under 4'10"). Recognized under RPwD 2016, eligible for all disability schemes
7. **Intellectual disability** — Conditions affecting mental abilities. Eligible for Niramaya health insurance (₹1L at ₹250/year), Sahyogi caregiver training
8. **Mental illness** — Schizophrenia, bipolar disorder, severe depression, etc. Covered under RPwD, eligible for treatment subsidies and Niramaya
9. **Autism spectrum** — ASD is a recognized disability. Eligible for National Trust schemes (Niramaya, Sahyogi, Gyan Prabha)
10. **Cerebral palsy** — Motor disability from birth. Eligible for assistive devices, Niramaya, special education support
11. **Muscular dystrophy** — Progressive muscle weakness. Eligible for wheelchairs, motorized aids, physiotherapy support
12. **Chronic neurological conditions** — Parkinson's, multiple sclerosis, etc. Eligible for disability pension if 40%+
13. **Specific learning disabilities** — Dyslexia, dyscalculia, dysgraphia. Eligible for educational accommodations, exam concessions
14. **Multiple sclerosis** — Progressive neurological condition. Eligible for ADIP devices and pension
15. **Speech & language disability** — Communication devices through ADIP, AAC devices
16. **Thalassemia** — Blood disorder requiring regular transfusions. Eligible for disability certificate if 40%+
17. **Hemophilia** — Blood clotting disorder. Eligible for disability pension and medical support
18. **Sickle cell disease** — Blood disorder, recognized under RPwD 2016
19. **Multiple disabilities** — Two or more of above conditions. Higher priority in all schemes
20. **Acid attack victims** — Recognized as disability, eligible for all schemes + rehabilitation
21. **Parkinson's disease** — Progressive neurological, eligible for pension and ADIP devices

### DISABILITY CERTIFICATE
- Issued by government hospital medical board (3+ specialists)
- States disability type and percentage (40%, 60%, 80%, 100%)
- 40%+ required for most government schemes
- 80%+ required for pension (IGNDPS)
- Valid for 5 years (or permanent for stable conditions)
- Apply at: District/State government hospital OR swavlambancard.gov.in
- Need: Aadhaar, 2 passport photos, medical records
- Processing time: 2-4 weeks typically
- UDID card can be applied for simultaneously

### GOVERNMENT SCHEMES IN DETAIL

#### 1. IGNDPS (Indira Gandhi National Disability Pension)
- ₹300-500/month (varies by state, some states add ₹200-300 extra)
- Age: 18-79 years
- Disability: 80%+ (certified)
- Must be BPL (Below Poverty Line) family
- Documents: Aadhaar, Disability Cert (80%+), BPL Card, Bank Passbook, 2 photos
- Apply at: Panchayat office, Block office, or CSC
- Processing: 30-60 days
- Payment: Direct bank transfer monthly

#### 2. ADIP Scheme (Assistance to Disabled Persons)
- FREE assistive devices: wheelchairs (₹6,000-25,000 value), hearing aids (₹15,000-50,000 value), artificial limbs, crutches, Braille kits, motorized tricycles, prosthetics, cochlear implants, spectacles, walking sticks
- Disability: 40%+
- Income: ≤₹20,000/month
- Full free if income ≤₹15,000; co-payment if ₹15,000-20,000
- Apply at: District Disability Rehabilitation Centre (DDRC), authorized NGO camps, or ALIMCO (Artificial Limbs Manufacturing Corporation)
- ALIMCO camps are held periodically in each district — contact DDRC for schedule

#### 3. UDID (Unique Disability Identity Card)
- Single ID card for accessing ALL disability schemes nationwide
- Any person with certified disability can apply
- Apply online: www.swavlambancard.gov.in
- Needed: Aadhaar, medical records, disability certificate, passport photo
- Benefits: Simplifies identity verification, portable across states, accepted everywhere
- Processing: 2-3 weeks after hospital verification

#### 4. Scholarships for Students with Disabilities
- **Pre-matric** (Class 9-10): ₹1,000/month + ₹10,000/year maintenance
- **Post-matric** (Class 11+): ₹3,000/month + ₹14,000/year maintenance
- **Top Class** (IIT/IIM/NIT/AIIMS): ₹5,000/month + full tuition
- **National Fellowship**: ₹31,000/month for PhD (JRF equivalent)
- Disability: 40%+
- Income: ≤₹2.5L/year (pre-matric), ≤₹3.5L/year (post-matric)
- Apply at: scholarships.gov.in (National Scholarship Portal)
- Deadline: Usually July-November each year

#### 5. Travel Concessions
- **Railway**: 50-75% discount (75% for blind, 50% for orthopedic)
- **Air India**: 50% discount for specific disability categories
- **State transport**: Many states offer free bus passes
- Get Railway Concession Certificate from district disability office
- Escort also gets concession when accompanying PwD

#### 6. National Trust Schemes
- **Niramaya**: Health insurance ₹1 lakh coverage at ₹250/year (for autism, CP, intellectual disability, multiple disabilities)
- **Sahyogi**: Caregiver training and support
- **Gyan Prabha**: Educational support and scholarships
- **Prerna**: Marketing support for products made by PwDs
- **Gharaunda**: Group housing facilities
- **Samarth**: Respite care for families

#### 7. Sugamya Bharat Abhiyan (Accessible India Campaign)
- Making public buildings accessible (ramps, lifts, signage)
- Accessible transport (buses, railway stations)
- Accessible websites and ICT
- File complaints about inaccessible buildings: www.accessibleindia.gov.in

#### 8. DDRS (Deendayal Disabled Rehabilitation Scheme)
- Grants to NGOs running disability rehabilitation
- Covers: vocational training, community rehab, special education, early intervention

### RIGHTS UNDER RPwD ACT 2016
- 4% reservation in government jobs (1% each for blindness, hearing, locomotor, intellectual/autism/cerebral palsy/mental illness)
- 5% reservation in higher education
- Free education for children with benchmark disability (6-18 years)
- Non-discrimination in employment
- Barrier-free access to public buildings
- Legal guardian rights for intellectual disability
- Right to live independently in community
- Grievance: File complaints with State Commissioner for Persons with Disabilities

### COMMON SERVICE CENTERS (CSCs)
- Government-authorized digital service centers
- Present in every Gram Panchayat (250,000+ centers across India)
- Services: form filling, document upload, biometric verification, scheme applications, printing
- Find nearest: Go to "Find CSC" page on DivyangSahay for interactive map
- Typical cost: ₹20-50 per service

### IMPORTANT CONTACTS
- National Disability Helpline: 1800-11-4461 (toll-free)
- UDID Portal: www.swavlambancard.gov.in
- Scholarship Portal: scholarships.gov.in
- ALIMCO: www.alimco.in (assistive devices)
- National Trust: www.thenationaltrust.gov.in
- Accessible India: www.accessibleindia.gov.in

## PLATFORM NAVIGATION (mention only as additional help, ALWAYS answer first)
- "Check Eligibility" page → AI matches you with schemes based on your profile
- "Find CSC" → Interactive map with nearby Common Service Centers
- Language selector → 6 languages (English, Hindi, Tamil, Telugu, Bengali, Marathi)
- Contrast/Font buttons → Accessibility controls
- Voice Assistant → Speak commands or questions

## RESPONSE GUIDELINES
1. ALWAYS answer the question directly with real information
2. Be empathetic and encouraging
3. Provide specific numbers: amounts, percentages, deadlines
4. When asked about a disability type, explain what it is and list all available schemes
5. Mention relevant documents needed
6. Optionally suggest the platform feature as a BONUS, never as the primary answer
7. Keep responses 2-4 paragraphs (chatbot) or 2-3 sentences (voice)
8. If genuinely unsure, say so honestly and suggest the helpline: 1800-11-4461
9. End with encouragement or next step
10. For voice responses, be concise but still informative

## EXAMPLE RESPONSES

User: "Tell me about locomotor disability"
You: "Locomotor disability covers conditions where you have difficulty with movement — this includes loss of limbs, paralysis, polio effects, cerebral palsy affecting movement, muscular dystrophy, and similar conditions. If you have 40% or more locomotor disability, you're eligible for some amazing support! The ADIP scheme provides free wheelchairs, crutches, artificial limbs, and even motorized tricycles. You can also get the IGNDPS pension (₹300-500/month) if you have 80%+ disability and belong to a BPL family. There's also 1% reservation in government jobs specifically for locomotor disability under the RPwD Act. Would you like to know more about any specific scheme or how to apply? 😊"

User: "What benefits can a blind person get?"
You: "There's actually quite a lot of support available for persons with blindness! 💪 First off, the ADIP scheme provides free Braille kits, white canes, smart canes, and screen reader software. You get the highest railway concession at 75% discount — that's a huge saving! If you have 80%+ visual disability and are from a BPL family, you qualify for IGNDPS pension of ₹300-500/month. For students, there are scholarships up to ₹5,000/month for top institutions. There's also 1% reservation in government jobs specifically for blindness. And under the RPwD Act, all public websites must be screen-reader accessible. The helpline 1800-11-4461 is always there if you need guidance. You truly deserve all of this! 🙌"

User: "am I eligible for pension?"
You: "Great question! The main disability pension is IGNDPS, which gives ₹300-500 per month (and many states add an extra ₹200-300 on top!). To qualify you need to be between 18-79 years old, have a disability certificate showing 80% or more, and belong to a BPL family. You'll need your Aadhaar card, disability certificate, BPL card, and bank passbook. Apply at your nearest Panchayat office, Block office, or CSC center — it usually takes 30-60 days to process. Could you tell me your disability percentage? That way I can give you a more specific answer! 😊"
`;

let genAI = null;
let chatModel = null;

function initializeGemini() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        console.warn('DivyangSahay: No Gemini API key found. Using smart fallback responses.');
        return false;
    }
    try {
        genAI = new GoogleGenerativeAI(apiKey);
        chatModel = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
                temperature: 0.85,
                topP: 0.92,
                topK: 40,
                maxOutputTokens: 500,
            },
        });
        console.log('DivyangSahay: ✅ Gemini AI initialized successfully!');
        return true;
    } catch (err) {
        console.error('DivyangSahay: Failed to initialize Gemini:', err);
        return false;
    }
}

const isInitialized = initializeGemini();
const chatSessions = new Map();

function getChatSession(sessionId) {
    if (!chatSessions.has(sessionId)) {
        if (!chatModel) return null;
        const chat = chatModel.startChat({ history: [] });
        chatSessions.set(sessionId, chat);
    }
    return chatSessions.get(sessionId);
}

// ---- COMPREHENSIVE FALLBACK RESPONSES (used ONLY when API key is missing) ----
const fallbackResponses = {
    // Disability types
    blind: "Blindness is recognized under the RPwD Act 2016. If you or someone you know is blind, here's what's available: The ADIP scheme provides free Braille kits, white canes, smart canes, and screen reader software. You get 75% railway discount — the highest among all disability categories! With 80%+ disability and BPL status, you qualify for IGNDPS pension (₹300-500/month). Students can get scholarships up to ₹5,000/month. There's also 1% reservation in government jobs for blindness. The national helpline 1800-11-4461 can help you with applications. 💪",
    deaf: "Hearing impairment (60dB+ hearing loss) is fully recognized under the RPwD Act. Here's what you can access: The ADIP scheme provides FREE hearing aids worth ₹15,000-50,000, plus cochlear implant support for severe cases. You get 50-75% railway concessions. With 80%+ disability and BPL status, the IGNDPS pension gives ₹300-500/month. Students get scholarships up to ₹5,000/month at top institutions. There's 1% reservation in government jobs. Sign language interpreter services are mandated in government offices. 😊",
    hearing: "Hearing impairment (60dB+ hearing loss) is fully recognized under the RPwD Act. Here's what you can access: The ADIP scheme provides FREE hearing aids worth ₹15,000-50,000, plus cochlear implant support for severe cases. You get 50-75% railway concessions. With 80%+ disability and BPL status, the IGNDPS pension gives ₹300-500/month. Students get scholarships up to ₹5,000/month at top institutions. There's 1% reservation in government jobs. Sign language interpreter services are mandated in government offices. 😊",
    locomotor: "Locomotor disability covers difficulty with movement — loss of limbs, paralysis, polio effects, muscular dystrophy, and similar conditions. Here's what's available: ADIP scheme provides FREE wheelchairs (worth ₹6,000-25,000), crutches, artificial limbs, and motorized tricycles. With 80%+ disability and BPL status, you get IGNDPS pension (₹300-500/month). Railway concessions of 50-75%. 1% reservation in government jobs. Students get scholarships up to ₹5,000/month. The ALIMCO holds camps in each district for fitting devices — contact your DDRC for the schedule! 💪",
    wheelchair: "Great news — the government's ADIP scheme provides wheelchairs completely FREE! They range from ₹6,000 to ₹25,000 in value. You need: a disability certificate showing 40%+, monthly income under ₹20,000, Aadhaar card, and income certificate. If your income is under ₹15,000/month, it's completely free; between ₹15,000-20,000, there's a small co-payment. Apply at your nearest District Disability Rehabilitation Centre (DDRC) or during ALIMCO camps held periodically in each district. The national helpline 1800-11-4461 can help you find the nearest camp! 🎉",
    autism: "Autism Spectrum Disorder (ASD) is fully recognized under both the RPwD Act 2016 and the National Trust for Welfare of Persons with Disabilities. Here's what's available: Niramaya health insurance gives ₹1 lakh coverage for just ₹250/year premium! Sahyogi provides caregiver training and support. Gyan Prabha offers educational assistance. Gharaunda provides group housing options. With 40%+ disability certificate, you're eligible for 1% job reservation (in the intellectual disability category), scholarships, and all other schemes. Early intervention services are available through DDRCs. 😊",
    cerebral: "Cerebral palsy is a motor disability recognized under both RPwD Act and National Trust. Here's what's available: ADIP scheme provides free assistive devices like wheelchairs, standing frames, and walkers. Niramaya health insurance gives ₹1 lakh coverage at just ₹250/year. Sahyogi provides caregiver training. Educational support through special schools and inclusive education programs. With 40%+ disability, eligible for scholarships, job reservation (1%), and IGNDPS pension (at 80%+). Early intervention and physiotherapy services through DDRCs. National helpline: 1800-11-4461. 💪",
    intellectual: "Intellectual disability is recognized under the RPwD Act 2016 and National Trust. Available support includes: Niramaya health insurance (₹1 lakh at ₹250/year), Sahyogi caregiver training, Gyan Prabha educational support, and Gharaunda group housing. With 40%+ disability certificate, you qualify for job reservation (1%), scholarships, and ADIP assistive devices. At 80%+ and BPL, IGNDPS pension of ₹300-500/month. Legal guardianship provisions are available under the National Trust Act. Special educators and vocational training through DDRCs. 😊",
    mental: "Mental illness (schizophrenia, bipolar disorder, severe depression, etc.) is recognized as a disability under RPwD Act 2016 with 40%+ assessment. Here's what's available: Disability certificate can be obtained from government psychiatric hospital. Niramaya health insurance (₹1 lakh at ₹250/year) covers treatment. Eligible for IGNDPS pension at 80%+. 1% reservation in government jobs. Free treatment in government hospitals. Scholarships for students. The RPwD Act prohibits discrimination based on mental illness. National helpline: 1800-11-4461 is confidential and supportive. You're not alone in this. 🙌",

    // Schemes
    eligib: "Let me help you figure out your eligibility! The main schemes available are: IGNDPS pension (₹300-500/month) for 80%+ disability with BPL status, ADIP scheme for free assistive devices (40%+ disability, income ≤₹20,000/month), UDID card for universal disability ID, scholarships for students (40%+ disability), railway concessions (50-75% discount), and Niramaya health insurance (₹1 lakh at ₹250/year for autism/CP/intellectual disability). The key factors are your disability percentage, income, age, and state. Could you share these details so I can match you precisely? 😊",
    pension: "The main disability pension is IGNDPS — that's ₹300-500 per month, and many states add extra ₹200-300 on top! To qualify: age 18-79, disability certificate showing 80%+, and BPL family status. Documents needed: Aadhaar, Disability Certificate (80%+), BPL Card, Bank Passbook, 2 photos. Apply at your Panchayat office, Block Development Office, or nearest CSC center. Processing takes 30-60 days, and payment comes directly to your bank account every month. 😊",
    document: "Here's what you'll typically need for government disability schemes: (1) Aadhaar Card — your universal ID, (2) Disability Certificate — get this from a government hospital medical board, it shows your disability type and percentage, (3) Income Certificate — from tehsildar/SDM office, (4) BPL Card — if applicable, (5) Bank Passbook — for direct benefit transfer, (6) Passport-size photos — 2-4 recent ones, (7) Residence proof — Voter ID or utility bill. The disability certificate is the most important one — visit your nearest government hospital and ask for a medical board assessment. It usually takes 2-4 weeks. 💪",
    scholarship: "Amazing scholarships available for students with disabilities! 🎓 Pre-matric (Class 9-10): ₹1,000/month + ₹10,000/year maintenance. Post-matric (Class 11+): ₹3,000/month + ₹14,000/year. Top Class (IIT/IIM/NIT/AIIMS): ₹5,000/month + full tuition! National Fellowship for PhD: ₹31,000/month. Requirements: 40%+ disability, family income under ₹2.5L/year (pre-matric) or ₹3.5L/year (post-matric). Apply at scholarships.gov.in — deadlines are usually July-November. Don't miss out!",
    udid: "UDID (Unique Disability Identity Card) is your golden ticket — it's a single ID card that gives you access to ALL disability schemes across India! Any person with a certified disability can get one. Apply online at swavlambancard.gov.in — you'll need your Aadhaar, medical records, disability certificate, and a passport photo. Processing takes 2-3 weeks after hospital verification. The best part? It's portable across states, so if you move, your benefits follow you! Definitely worth getting. 🎫",
    csc: "Common Service Centers (CSCs) are government-authorized digital service points spread across India — there are over 250,000 of them, in pretty much every village and block! They help with: filling out scheme application forms, uploading documents, biometric verification, and tracking application status. The typical cost is just ₹20-50 per service. They're super helpful if you're not comfortable with online applications.",
    adip: "The ADIP scheme is amazing — it provides FREE assistive devices! Here's what's available: wheelchairs (₹6,000-25,000 value), hearing aids (₹15,000-50,000), artificial limbs, crutches, motorized tricycles, Braille kits, prosthetics, cochlear implants, spectacles, and walking sticks. Requirements: 40%+ disability, income ≤₹20,000/month. Completely free if income ≤₹15,000/month. Apply at District Disability Rehabilitation Centre (DDRC) or during ALIMCO camps. Contact your DDRC for the next camp schedule! 🎉",
    niramaya: "Niramaya is an incredible health insurance scheme by the National Trust! It provides ₹1 lakh coverage for just ₹250/year premium — that's unbelievably affordable! It covers: hospitalization, surgery, therapy, medication, regular health checkups, and dental treatment. Available for persons with autism, cerebral palsy, mental retardation, and multiple disabilities. Apply through registered organizations of the National Trust. Visit www.thenationaltrust.gov.in for details. 😊",
    railway: "Persons with disabilities get significant railway concessions! Blind persons get 75% discount — the highest. Orthopedic/locomotor disability gets 50-75% depending on class. Hearing impairment gets 50%. Mental illness gets 50%. Your escort/companion also gets a discount! You need a Railway Concession Certificate from your district disability office. Show your disability certificate to get it. This works for all trains across India. Air India also offers 50% discount for certain disability categories. 🚂",

    // Rights
    rights: "Under the RPwD Act 2016, you have powerful legal rights! 4% reservation in government jobs (1% each for blindness, hearing, locomotor, and intellectual/autism/CP/mental illness categories). 5% reservation in higher education. Free education for children with benchmark disability ages 6-18. Non-discrimination in employment — firing someone for disability is illegal. All public buildings must be barrier-free (ramps, lifts, signage). Legal guardian provisions for intellectual disability. You can file grievances with the State Commissioner for Persons with Disabilities. Know your rights! 💪",
    job: "Under the RPwD Act 2016, there's 4% reservation in government jobs — 1% each for: (1) blindness/low vision, (2) hearing impairment, (3) locomotor disability, and (4) intellectual disability/autism/CP/mental illness. Private companies with 20+ employees must also comply with equal opportunity policies. There are also skill training programs through DDRCs and NHFDC (National Handicapped Finance & Development Corporation) that provide loans at 5% interest for self-employment. The national helpline 1800-11-4461 can help with job-related queries. 😊",
    rpwd: "The Rights of Persons with Disabilities (RPwD) Act 2016 is India's landmark disability law that recognizes 21 types of disabilities! Key provisions: 4% reservation in government jobs, 5% in higher education; free education for children 6-18; non-discrimination mandated; all public buildings must be accessible; legal guardianship provisions; right to live independently; 21 disabilities recognized (up from 7 in old act). File complaints with your State Commissioner for Persons with Disabilities or Chief Commissioner at central level. This law is your shield! 🛡️",

    // General
    hello: "Hey there! 👋 I'm Sahay, your personal DivyangSahay guide! I know a LOT about government disability benefits in India — pensions, scholarships, free assistive devices, job reservations, travel concessions, and all 21 recognized disability types. Whether you need help understanding, applying, or just want to chat about what's available for you — I'm all ears! What's on your mind? 😊",
    help: "I can help you with so much! Here's what I know inside out: (1) All 21 disability types under RPwD Act and what schemes apply to each, (2) IGNDPS pension details and how to apply, (3) Free assistive devices through ADIP, (4) Scholarships for students with disabilities, (5) UDID card — what it is and how to get one, (6) Railway and travel concessions, (7) Your legal rights under RPwD Act 2016, (8) Job reservations and self-employment loans, (9) Niramaya health insurance, (10) Finding service centers near you. Just ask me anything — no question is too basic! 😊",
    thank: "You're so welcome! 😊 And honestly, I'm really glad you're taking these steps. These benefits exist specifically for you, and you deserve every single one of them. Don't hesitate to come back anytime — I'm always here, 24/7! Remember, the national helpline 1800-11-4461 is also available if you need additional help. Take care and all the best! 🙌",
    default: "Hey! I'm Sahay, your DivyangSahay guide 😊 I specialize in disability benefits in India — I know about all 21 disability types, government schemes like IGNDPS pension (₹300-500/month), ADIP free assistive devices, scholarships (up to ₹5,000/month), UDID cards, railway concessions, job reservations, and your legal rights under RPwD Act 2016. What would you like to know? I'm here to help! 🤝",
};

function getFallbackResponse(message) {
    const lower = message.toLowerCase();

    // Disability-specific matching (prioritize these)
    if (lower.includes('blind') || lower.includes('vision') || lower.includes('sight') || lower.includes('दृष्टि')) return fallbackResponses.blind;
    if (lower.includes('deaf') || lower.includes('hearing') || lower.includes('बहरा') || lower.includes('श्रवण')) return fallbackResponses.hearing;
    if (lower.includes('locomotor') || lower.includes('paralysis') || lower.includes('polio') || lower.includes('limb') || lower.includes('movement')) return fallbackResponses.locomotor;
    if (lower.includes('wheelchair') || lower.includes('crutch') || lower.includes('tricycle')) return fallbackResponses.wheelchair;
    if (lower.includes('autism') || lower.includes('asd') || lower.includes('ऑटिज्म')) return fallbackResponses.autism;
    if (lower.includes('cerebral') || lower.includes('cp ')) return fallbackResponses.cerebral;
    if (lower.includes('intellectual') || lower.includes('mental retard') || lower.includes('बौद्धिक')) return fallbackResponses.intellectual;
    if (lower.includes('mental') || lower.includes('schizophrenia') || lower.includes('bipolar') || lower.includes('depression') || lower.includes('psychiatric')) return fallbackResponses.mental;

    // Scheme matching
    if (lower.includes('niramaya') || lower.includes('health insurance')) return fallbackResponses.niramaya;
    if (lower.includes('adip') || lower.includes('assistive device') || lower.includes('hearing aid') || lower.includes('braille')) return fallbackResponses.adip;
    if (lower.includes('railway') || lower.includes('train') || lower.includes('travel') || lower.includes('concession')) return fallbackResponses.railway;
    if (lower.includes('pension') || lower.includes('igndps') || lower.includes('पेंशन')) return fallbackResponses.pension;
    if (lower.includes('scholarship') || lower.includes('student') || lower.includes('education') || lower.includes('छात्रवृत्ति')) return fallbackResponses.scholarship;
    if (lower.includes('udid') || lower.includes('identity card') || lower.includes('disability card')) return fallbackResponses.udid;
    if (lower.includes('eligib') || lower.includes('qualify') || lower.includes('पात्रता')) return fallbackResponses.eligib;
    if (lower.includes('document') || lower.includes('paper') || lower.includes('aadhaar') || lower.includes('certificate') || lower.includes('दस्तावेज')) return fallbackResponses.document;
    if (lower.includes('csc') || lower.includes('center') || lower.includes('near') || lower.includes('map') || lower.includes('centre')) return fallbackResponses.csc;

    // Rights and jobs
    if (lower.includes('right') || lower.includes('law') || lower.includes('rpwd') || lower.includes('act') || lower.includes('अधिकार')) return fallbackResponses.rpwd;
    if (lower.includes('job') || lower.includes('employment') || lower.includes('reservation') || lower.includes('work') || lower.includes('नौकरी')) return fallbackResponses.job;

    // General
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste') || lower.includes('नमस्ते')) return fallbackResponses.hello;
    if (lower.includes('help') || lower.includes('what can') || lower.includes('commands') || lower.includes('मदद')) return fallbackResponses.help;
    if (lower.includes('thank') || lower.includes('bye') || lower.includes('ok') || lower.includes('धन्यवाद')) return fallbackResponses.thank;
    if (lower.includes('disabilit') || lower.includes('divyang') || lower.includes('handicap') || lower.includes('विकलांग')) return fallbackResponses.rights;
    if (lower.includes('money') || lower.includes('benefit') || lower.includes('scheme') || lower.includes('योजना')) return fallbackResponses.eligib;

    return fallbackResponses.default;
}

// ---- PUBLIC API ----

export async function chatWithAI(message, sessionId = 'chatbot') {
    if (!isInitialized || !chatModel) return getFallbackResponse(message);

    try {
        const chat = getChatSession(sessionId);
        if (!chat) return getFallbackResponse(message);
        const result = await chat.sendMessage(message);
        const text = result.response.text();
        if (!text || text.trim().length === 0) return getFallbackResponse(message);
        return text;
    } catch (err) {
        console.error('DivyangSahay AI error:', err?.message || err);
        // Reset chat session on error to avoid stuck conversations
        chatSessions.delete(sessionId);
        return getFallbackResponse(message);
    }
}

export async function voiceWithAI(transcript) {
    if (!isInitialized || !chatModel) return stripEmojisForVoice(getFallbackResponse(transcript));

    try {
        const chat = getChatSession('voice');
        if (!chat) return stripEmojisForVoice(getFallbackResponse(transcript));
        const result = await chat.sendMessage(
            `The user spoke this via voice (will be read aloud by TTS): "${transcript}"\n\nIMPORTANT RULES FOR THIS VOICE RESPONSE:\n1. Reply in 2-3 clear, concise sentences only\n2. Do NOT use ANY emojis, emoticons, or special symbols — they get read aloud as descriptions by TTS which sounds terrible\n3. Do NOT use asterisks, bullet points, or markdown formatting — this is spoken audio\n4. Answer the question directly with specific facts and numbers\n5. Be warm and friendly but keep it SHORT for voice\n6. Do NOT say "go to our page" or redirect — answer HERE`
        );
        const text = result.response.text();
        if (!text || text.trim().length === 0) return stripEmojisForVoice(getFallbackResponse(transcript));
        return text;
    } catch (err) {
        console.error('DivyangSahay Voice AI error:', err?.message || err);
        chatSessions.delete('voice');
        return stripEmojisForVoice(getFallbackResponse(transcript));
    }
}

// Strip emojis from fallback responses when used for voice
function stripEmojisForVoice(text) {
    return text
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{FE0F}\u{FE00}-\u{FE0F}\u{20E3}]/gu, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

export function isAIAvailable() {
    return isInitialized && chatModel !== null;
}
