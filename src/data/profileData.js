// Single source of truth for all portfolio content
export const profile = {
  name: 'Rajdeep Chatale',
  pronouns: 'He/Him',
  tagline: 'GSA\'25 @Google | Computer Engineering Student | AI & ML Enthusiast',
  shortBio: 'Software Engineer · Open Source Enthusiast · Hackathon Winner',
  location: 'Mumbai, Maharashtra, India',
  email: 'rajdeepchatale@gmail.com',
  about: [
    'Currently pursuing a Bachelor of Engineering in Computer Engineering at the University of Mumbai, I serve as the PR & Business Development Coordinator at HackOverflow, where I utilize my expertise in public relations, sponsorship outreach, and brand collaborations.',
    'At HackOverflow, I contribute to fostering partnerships and developing meaningful connections with stakeholders to support organizational goals. My experience as a Space Moderator with Under25 and a Google Student Ambassador has enhanced my ability to manage community engagement, coordinate events, and promote innovative technologies like AI.',
    'I am committed to leveraging my skills to drive impactful collaborations and create value for the team.',
  ],
  social: {
    github: 'https://github.com/rajdeepchatale',
    linkedin: 'https://www.linkedin.com/in/rajdeep-chatale-366514375/',
  },
};

export const experience = [
  {
    role: 'Space Moderator | Under25 App',
    company: 'Under25',
    type: 'Part-time',
    period: 'Jul 2025 – Present',
    duration: '9 mos',
    description: 'Organized and managed the Space XP contest on the Under25 app, engaging the community, coordinating challenges, and ensuring a smooth, fair, and fun experience for all participants.',
    skills: ['Content Moderation', 'Communication', 'Community Management', 'User Engagement'],
    icon: 'fa-users',
    color: '#7C3AED',
  },
  {
    role: 'PR & Business Development Coordinator',
    company: 'HackOverflow',
    type: 'Part-time',
    period: 'Jan 2026 – Mar 2026',
    duration: '3 mos',
    description: 'Led public relations, sponsorship outreach, and brand collaborations. Fostered partnerships and developed meaningful connections with stakeholders to support organizational goals.',
    skills: ['Public Relations', 'Business Development', 'Sponsorship Outreach', 'Brand Collaborations', 'Professional Communication'],
    icon: 'fa-handshake',
    color: '#F59E0B',
  },
  {
    role: 'Google Student Ambassador',
    company: 'Google',
    type: 'Internship',
    period: 'Aug 2025 – Dec 2025',
    duration: '5 mos',
    description: 'Promoted Gemini AI, Google\'s advanced generative AI platform, among students and educators. Conducted awareness sessions, shared learning resources, and demonstrated AI capabilities across campus.',
    skills: ['Campus Promotion', 'Communication', 'Leadership', 'Public Speaking', 'Student Engagement', 'Strategic Planning'],
    icon: 'fa-google',
    color: '#4285F4',
    isBrand: true,
  },
];

export const skills = {
  'AI & Technology': [
    'Artificial Intelligence (AI)',
    'Ethical AI / Responsible AI',
    'AI Literacy',
    'AI for Productivity',
    'Human-AI Collaboration',
  ],
  'Programming & Development': [
    'Python',
    'JavaScript',
    'React',
    'Vite',
    'Tailwind CSS',
    'Git',
    'DSA',
    'Problem Solving',
  ],
  'Leadership & Management': [
    'Leadership',
    'Team Management',
    'Strategic Planning',
    'Team Coordination',
    'Community Building',
    'Community Management',
  ],
  'Business & Entrepreneurship': [
    'Entrepreneurship',
    'Startup Development',
    'Business Model Canvas',
    'Lean Startup',
    'Market Research & Customer Segmentation',
    'Idea Validation',
    'Product Development',
  ],
  'Communication & Outreach': [
    'Public Speaking',
    'Public Relations',
    'Sponsorship Outreach',
    'Brand Collaborations',
    'Professional Communication',
    'Pitching & Presentation',
    'Content Moderation',
  ],
};

export const projects = [
  {
    title: 'DivyangSahay',
    subtitle: 'AI-Powered Benefit Assistant',
    description: 'An accessibility-first, multi-agent AI platform that helps persons with disabilities in India discover, verify, and apply for government welfare schemes. Built with React, Vite, Tailwind CSS, and Gemini AI with features like voice assistant, chatbot, multi-language support, and CSC locator.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Gemini AI', 'Leaflet Maps', 'Speech API'],
    github: 'https://github.com/rajdeepchatale/DivyangSahay',
    highlights: ['Multi-Agent AI System', 'Voice & Chat Assistant', '6 Language Support', 'WCAG 2.1 AA Compliant'],
    color: '#007bff',
  },
  {
    title: 'Canteen Demand Prediction System',
    subtitle: 'Machine Learning Project',
    description: 'A predictive analytics system designed to forecast and optimize canteen demand using machine learning algorithms. Helps reduce food waste and improve operational efficiency through data-driven decision making.',
    tech: ['Python', 'Machine Learning', 'Data Analysis', 'Predictive Modeling'],
    github: null,
    highlights: ['Demand Forecasting', 'Waste Reduction', 'Data-Driven Decisions', 'Operational Efficiency'],
    color: '#28a745',
  },
];

export const education = [
  {
    degree: 'B.E. in Computer Engineering',
    institution: 'Pillai HOC College of Engineering & Technology (PHCET)',
    university: 'University of Mumbai',
    period: '2024 – 2028',
    status: 'Currently Pursuing',
    icon: 'fa-graduation-cap',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Dg Tatkare Jr. College',
    period: 'Completed',
    icon: 'fa-school',
  },
  {
    degree: '10th Standard (CBSE)',
    institution: 'Jindal Mount Litera Zee School',
    period: 'Completed',
    icon: 'fa-book-open',
  },
];

export const achievements = [
  {
    title: '1st Rank at HackOverflow 4.0',
    description: 'Team Dreamers secured 1st Rank at HackOverflow 4.0 hackathon, competing against numerous talented teams.',
    icon: 'fa-trophy',
    color: '#F59E0B',
  },
  {
    title: 'Wadhwani Foundation — Certificate of Proficiency',
    description: 'Successfully completed the Ignite India program (Dec 2025), developing a Certified Practice Venture recognized for excellence and real-world impact. 42 hours of training.',
    icon: 'fa-certificate',
    color: '#EF4444',
  },
  {
    title: 'Google Student Ambassador',
    description: 'Selected as GSA\'25 to promote Gemini AI and Google technologies across campus, conducting awareness sessions and demonstrations.',
    icon: 'fa-award',
    color: '#4285F4',
  },
];

export const interests = [
  { label: 'Open Source', icon: 'fa-code-branch' },
  { label: 'Coding', icon: 'fa-code' },
  { label: 'Reading Books', icon: 'fa-book' },
  { label: 'Hackathons', icon: 'fa-laptop-code' },
  { label: 'AI & ML', icon: 'fa-robot' },
  { label: 'Problem Solving', icon: 'fa-puzzle-piece' },
];

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
