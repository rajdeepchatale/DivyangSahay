import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StatsCard from '../components/StatsCard';
import AnimateOnScroll from '../components/AnimateOnScroll';

const agents = [
    {
        id: 1,
        name: 'Eligibility Matching Agent',
        description: 'Intelligently matches users to government schemes using multi-criteria reasoning — disability %, income, age, state, and education.',
        icon: 'fas fa-brain',
        colorStart: '#007bff',
        colorEnd: '#6366f1',
        bgClass: 'bg-primary-50',
        iconColor: 'text-primary-500',
        type: 'core',
        link: '/eligibility',
        features: ['Multi-criteria reasoning', '"Why You Qualify" explanations', 'Real-time matching'],
    },
    {
        id: 2,
        name: 'Application Draft Generator',
        description: 'Auto-generates pre-filled application forms, creates document checklists, and provides submission instructions.',
        icon: 'fas fa-file-signature',
        colorStart: '#28a745',
        colorEnd: '#20c997',
        bgClass: 'bg-secondary-50',
        iconColor: 'text-secondary-500',
        type: 'core',
        link: '/results',
        features: ['Pre-filled applications', 'Document checklists', 'Step-by-step instructions'],
    },
    {
        id: 3,
        name: 'Multi-Language Translation',
        description: 'Context-aware translation supporting Hindi, Tamil, Telugu, Bengali, and Marathi — not just literal, but meaningful.',
        icon: 'fas fa-language',
        colorStart: '#fd7e14',
        colorEnd: '#e83e8c',
        bgClass: 'bg-accent-50',
        iconColor: 'text-accent-500',
        type: 'core',
        link: null,
        features: ['6 languages supported', 'Context-aware translation', 'Instant switching'],
    },
    {
        id: 4,
        name: 'CSC Locator & Navigation',
        description: 'Finds nearest Common Service Centers with address, contact info, distance, and available services on an interactive map.',
        icon: 'fas fa-map-marked-alt',
        colorStart: '#17a2b8',
        colorEnd: '#007bff',
        bgClass: 'bg-blue-50',
        iconColor: 'text-blue-500',
        type: 'core',
        link: '/csc-locator',
        features: ['Interactive map', 'Distance calculation', 'Service listings'],
    },
    {
        id: 5,
        name: 'Document Verification',
        description: 'Validates uploaded documents using OCR technology, checks completeness, and ensures correctness before submission.',
        icon: 'fas fa-search-plus',
        colorStart: '#6f42c1',
        colorEnd: '#007bff',
        bgClass: 'bg-purple-50',
        iconColor: 'text-purple-500',
        type: 'bonus',
        link: null,
        features: ['OCR-powered validation', 'Completeness check', 'Instant feedback'],
    },
    {
        id: 6,
        name: 'Notification & Reminder',
        description: 'Sends deadline alerts and status update notifications so you never miss an important date or update.',
        icon: 'fas fa-bell',
        colorStart: '#e83e8c',
        colorEnd: '#fd7e14',
        bgClass: 'bg-pink-50',
        iconColor: 'text-pink-500',
        type: 'bonus',
        link: null,
        features: ['Deadline alerts', 'Status updates', 'Smart reminders'],
    },
    {
        id: 7,
        name: 'Q&A Support Chatbot',
        description: 'Answers user questions about schemes through a natural-language conversational interface, available 24/7.',
        icon: 'fas fa-comments',
        colorStart: '#28a745',
        colorEnd: '#17a2b8',
        bgClass: 'bg-teal-50',
        iconColor: 'text-teal-500',
        type: 'bonus',
        link: null,
        features: ['24/7 availability', 'Natural language', 'Scheme guidance'],
    },
    {
        id: 8,
        name: 'Voice Assistant',
        description: 'Enables completely voice-based interaction for blind and visually impaired users — speak commands, hear results.',
        icon: 'fas fa-microphone-alt',
        colorStart: '#dc3545',
        colorEnd: '#6f42c1',
        bgClass: 'bg-red-50',
        iconColor: 'text-red-500',
        type: 'bonus',
        link: null,
        features: ['Speech-to-Text', 'Text-to-Speech', 'Voice navigation'],
    },
];

export default function Home() {
    const { t } = useLanguage();

    const steps = [
        { icon: 'fas fa-user-circle', title: t('howItWorks.step1Title'), description: t('howItWorks.step1Desc'), time: t('howItWorks.step1Time'), agent: 'Agent 1' },
        { icon: 'fas fa-brain', title: t('howItWorks.step2Title'), description: t('howItWorks.step2Desc'), time: t('howItWorks.step2Time'), agent: 'Agent 1' },
        { icon: 'fas fa-check-double', title: t('howItWorks.step3Title'), description: t('howItWorks.step3Desc'), time: t('howItWorks.step3Time'), agent: 'Agent 2' },
        { icon: 'fas fa-paper-plane', title: t('howItWorks.step4Title'), description: t('howItWorks.step4Desc'), time: t('howItWorks.step4Time'), agent: 'Agent 2 + 4' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section
                className="gradient-hero text-white py-20 sm:py-28 lg:py-36 relative overflow-hidden"
                aria-labelledby="hero-heading"
            >
                {/* Animated background with floating particles */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 animate-pulse-soft"></div>
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-400/5 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-green-400/5 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-400/5 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
                    {/* Floating dot particles */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-white/20 animate-float-particle"
                            style={{
                                left: `${10 + i * 12}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                animationDelay: `${i * 0.8}s`,
                                animationDuration: `${5 + i}s`,
                            }}
                        />
                    ))}
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="animate-fade-in">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-sm">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-blue-100">
                                <i className="fas fa-robot mr-1" aria-hidden="true"></i>
                                {t('hero.badge')}
                            </span>
                        </div>

                        <h1
                            id="hero-heading"
                            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight"
                        >
                            <span className="text-white">Divyang</span>
                            <span className="text-green-300">Sahay</span>
                        </h1>

                        <p className="text-xl sm:text-2xl mb-3 font-semibold text-blue-50">
                            {t('hero.subtitle')}
                        </p>
                        <p className="text-lg mb-10 text-blue-200 max-w-2xl mx-auto leading-relaxed">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/eligibility"
                                className="btn text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                style={{ background: 'linear-gradient(135deg, #28a745, #20c997)' }}
                                id="cta-eligibility"
                            >
                                <i className="fas fa-search mr-2" aria-hidden="true"></i>
                                {t('hero.cta')}
                            </Link>
                            <Link
                                to="/about"
                                className="btn bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-4 rounded-xl border border-white/25 backdrop-blur-sm transition-all duration-300"
                            >
                                <i className="fas fa-play-circle mr-2" aria-hidden="true"></i>
                                {t('hero.learn')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 sm:py-20 bg-white" aria-labelledby="stats-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 id="stats-heading" className="sr-only">Key Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-stagger">
                        <AnimateOnScroll variant="scale"><StatsCard icon="♿" value="26" suffix="M+" label={t('stats.disabled')} delay={0} /></AnimateOnScroll>
                        <AnimateOnScroll variant="scale"><StatsCard icon="📊" value="70" suffix="%" label={t('stats.unclaimed')} delay={200} /></AnimateOnScroll>
                        <AnimateOnScroll variant="scale"><StatsCard icon="💰" value="36000" prefix="₹" suffix=" Cr" label={t('stats.loss')} delay={400} /></AnimateOnScroll>
                    </div>
                </div>
            </section>

            {/* AI Agents Showcase */}
            <section className="py-16 sm:py-24 gradient-agents" aria-labelledby="agents-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateOnScroll>
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
                                <i className="fas fa-robot" aria-hidden="true"></i>
                                {t('agents.badge')}
                            </div>
                            <h2 id="agents-heading" className="section-title">
                                {t('agents.title')}
                            </h2>
                            <p className="section-subtitle">
                                {t('agents.subtitle')}
                            </p>
                        </div>
                    </AnimateOnScroll>

                    {/* Core agents */}
                    <div className="mb-10">
                        <AnimateOnScroll>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="agent-badge core">
                                    <i className="fas fa-star" aria-hidden="true"></i>
                                    4 {t('agents.coreLabel')}
                                </span>
                            </div>
                        </AnimateOnScroll>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-stagger">
                            {agents.filter(a => a.type === 'core').map((agent, index) => (
                                <AnimateOnScroll key={agent.id}>
                                    <div
                                        className="agent-card card-hover-lift"
                                        style={{
                                            '--agent-color-start': agent.colorStart,
                                            '--agent-color-end': agent.colorEnd,
                                        }}
                                    >
                                        <div className={`agent-icon ${agent.bgClass}`} style={{ animationDelay: `${index * 200}ms` }}>
                                            <i className={`${agent.icon} ${agent.iconColor}`} aria-hidden="true"></i>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold text-gray-400">AGENT {agent.id}</span>
                                            <span className="text-xs px-1.5 py-0.5 rounded bg-primary-50 text-primary-600 font-semibold">Core</span>
                                        </div>
                                        <h3 className="font-heading font-bold text-base text-gray-900 mb-2">{agent.name}</h3>
                                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{agent.description}</p>
                                        <ul className="space-y-1.5">
                                            {agent.features.map((f, i) => (
                                                <li key={i} className="text-xs text-gray-500 flex items-center gap-1.5">
                                                    <i className="fas fa-check text-secondary-400" aria-hidden="true"></i>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        {agent.link && (
                                            <Link to={agent.link} className="mt-4 inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-700 font-medium transition-colors">
                                                {t('agents.tryIt')} <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
                                            </Link>
                                        )}
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>

                    {/* Bonus agents */}
                    <div>
                        <AnimateOnScroll>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="agent-badge bonus">
                                    <i className="fas fa-bolt" aria-hidden="true"></i>
                                    4 {t('agents.advancedLabel')}
                                </span>
                            </div>
                        </AnimateOnScroll>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-stagger">
                            {agents.filter(a => a.type === 'bonus').map((agent, index) => (
                                <AnimateOnScroll key={agent.id}>
                                    <div
                                        className="agent-card card-hover-lift"
                                        style={{
                                            '--agent-color-start': agent.colorStart,
                                            '--agent-color-end': agent.colorEnd,
                                        }}
                                    >
                                        <div className={`agent-icon ${agent.bgClass}`} style={{ animationDelay: `${index * 200}ms` }}>
                                            <i className={`${agent.icon} ${agent.iconColor}`} aria-hidden="true"></i>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold text-gray-400">AGENT {agent.id}</span>
                                            <span className="text-xs px-1.5 py-0.5 rounded bg-accent-50 text-accent-600 font-semibold">Advanced</span>
                                        </div>
                                        <h3 className="font-heading font-bold text-base text-gray-900 mb-2">{agent.name}</h3>
                                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{agent.description}</p>
                                        <ul className="space-y-1.5">
                                            {agent.features.map((f, i) => (
                                                <li key={i} className="text-xs text-gray-500 flex items-center gap-1.5">
                                                    <i className="fas fa-check text-secondary-400" aria-hidden="true"></i>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 sm:py-20 bg-white" aria-labelledby="how-it-works-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateOnScroll>
                        <h2 id="how-it-works-heading" className="section-title">
                            {t('howItWorks.title')}
                        </h2>
                        <p className="section-subtitle">
                            {t('howItWorks.subtitle')}
                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 animate-stagger">
                        {steps.map((step, index) => (
                            <AnimateOnScroll key={index}>
                                <div className="glass-card-light text-center group relative card-hover-lift">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                                        {index + 1}
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4 mt-2 group-hover:scale-110 transition-transform duration-300">
                                        <i className={`${step.icon} text-primary-500 text-xl`} aria-hidden="true"></i>
                                    </div>
                                    <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
                                            <i className="fas fa-clock" aria-hidden="true"></i>
                                            {step.time}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                            <i className="fas fa-robot" aria-hidden="true"></i>
                                            {step.agent}
                                        </span>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>

                    <AnimateOnScroll>
                        <div className="text-center mt-12">
                            <Link to="/eligibility" className="btn-primary text-lg px-8 py-4">
                                <i className="fas fa-rocket" aria-hidden="true"></i>
                                {t('howItWorks.cta')}
                            </Link>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Built for Everyone */}
            <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="trusted-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AnimateOnScroll>
                        <h2 id="trusted-heading" className="section-title">
                            {t('accessibility.title')}
                        </h2>
                        <p className="section-subtitle">
                            {t('accessibility.subtitle')}
                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-stagger">
                        {[
                            { icon: 'fas fa-universal-access', label: t('accessibility.wcag') },
                            { icon: 'fas fa-keyboard', label: t('accessibility.keyboard') },
                            { icon: 'fas fa-eye', label: t('accessibility.contrast') },
                            { icon: 'fas fa-assistive-listening-systems', label: t('accessibility.screenReader') },
                        ].map((feature, i) => (
                            <AnimateOnScroll key={i} variant="scale">
                                <div className="flex flex-col items-center gap-3 p-6 glass-card-light card-hover-lift">
                                    <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-500 text-2xl">
                                        <i className={feature.icon} aria-hidden="true"></i>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">{feature.label}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 relative overflow-hidden" aria-labelledby="cta-heading">
                <div className="absolute inset-0 gradient-cta"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }} aria-hidden="true"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <AnimateOnScroll>
                        <h2 id="cta-heading" className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-white">
                            {t('cta.title')}
                        </h2>
                        <p className="text-lg text-white/80 mb-8">
                            {t('cta.subtitle')}
                        </p>
                        <Link
                            to="/eligibility"
                            className="btn bg-white text-primary-600 hover:bg-blue-50 text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-bold"
                        >
                            <i className="fas fa-arrow-right" aria-hidden="true"></i>
                            {t('cta.button')}
                        </Link>
                    </AnimateOnScroll>
                </div>
            </section>
        </div>
    );
}
