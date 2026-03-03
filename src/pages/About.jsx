import { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnimateOnScroll from '../components/AnimateOnScroll';

const roadmap = [
    { phase: 'Phase 1', title: 'Pilot Launch', desc: '3 states, WhatsApp bot, basic eligibility check', status: 'active', icon: 'fas fa-rocket' },
    { phase: 'Phase 2', title: 'Pan-India Scale', desc: 'UDID integration, voice interface, all states', status: 'upcoming', icon: 'fas fa-globe-asia' },
    { phase: 'Phase 3', title: 'Mobile App', desc: 'AI document verification, blockchain records', status: 'upcoming', icon: 'fas fa-mobile-alt' },
];

const team = [
    { name: 'Anay Malichkar', role: 'Lead Developer', icon: 'fas fa-code', color: 'bg-primary-50 text-primary-500' },
    { name: 'Yash Patil', role: 'AI/ML Engineer', icon: 'fas fa-brain', color: 'bg-secondary-50 text-secondary-500' },
    { name: 'Rajdeep Chatale', role: 'Accessibility & UX', icon: 'fas fa-universal-access', color: 'bg-accent-50 text-accent-500' },
];

export default function About() {
    const { addToast } = useApp();
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactErrors, setContactErrors] = useState({});

    const handleContactChange = (e) => {
        setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (contactErrors[e.target.name]) setContactErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const errs = {};
        if (!contactForm.name.trim()) errs.name = 'Name is required';
        if (!contactForm.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errs.email = 'Please enter a valid email';
        if (!contactForm.message.trim()) errs.message = 'Message is required';
        if (Object.keys(errs).length > 0) { setContactErrors(errs); return; }
        addToast('Thank you! Your message has been sent successfully.', 'success');
        setContactForm({ name: '', email: '', message: '' });
    };

    return (
        <div>
            {/* Mission */}
            <section className="gradient-hero text-white py-16 sm:py-24 relative overflow-hidden" aria-labelledby="mission-heading">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-white/20 animate-float-particle"
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                animationDelay: `${i * 0.7}s`,
                                animationDuration: `${5 + i}s`,
                            }}
                        />
                    ))}
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="animate-fade-in">
                        <h1 id="mission-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
                            Disability Is Not Inability
                        </h1>
                        <p className="text-xl sm:text-2xl text-blue-100 mb-4 font-medium">
                            We&apos;re fixing access. One benefit at a time.
                        </p>
                        <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                            DivyangSahay bridges the gap between persons with disabilities and the government benefits they deserve, using AI to simplify discovery and application.
                        </p>
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section className="py-16 sm:py-20 bg-white" aria-labelledby="impact-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateOnScroll>
                        <h2 id="impact-heading" className="section-title">Projected <span className="text-gradient">Impact</span></h2>
                        <p className="section-subtitle">Our vision for transforming disability benefit access in India</p>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-stagger">
                        <AnimateOnScroll variant="scale">
                            <div className="card text-center border-2 border-primary-100 card-hover-lift">
                                <p className="text-sm font-semibold text-primary-500 mb-2">YEAR 1 TARGET</p>
                                <p className="text-4xl font-heading font-bold text-gray-900 mb-1">10,000</p>
                                <p className="text-gray-600">Users Served</p>
                                <div className="mt-3 py-2 bg-primary-50 rounded-lg"><p className="font-bold text-primary-600">₹36 Crore</p><p className="text-xs text-gray-500">Benefits Claimed</p></div>
                            </div>
                        </AnimateOnScroll>
                        <AnimateOnScroll variant="scale">
                            <div className="card text-center border-2 border-secondary-100 card-hover-lift">
                                <p className="text-sm font-semibold text-secondary-500 mb-2">YEAR 5 TARGET</p>
                                <p className="text-4xl font-heading font-bold text-gray-900 mb-1">10 Million</p>
                                <p className="text-gray-600">Users Nationwide</p>
                                <div className="mt-3 py-2 bg-secondary-50 rounded-lg"><p className="font-bold text-secondary-600">₹36,000 Crore</p><p className="text-xs text-gray-500">Benefits Claimed</p></div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="roadmap-heading">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateOnScroll>
                        <h2 id="roadmap-heading" className="section-title">Our <span className="text-gradient">Roadmap</span></h2>
                        <p className="section-subtitle">The journey from pilot to pan-India impact</p>
                    </AnimateOnScroll>
                    <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>
                        <div className="space-y-8 animate-stagger">
                            {roadmap.map((item, i) => (
                                <AnimateOnScroll key={i}>
                                    <div className="relative flex gap-4 ml-0">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${item.status === 'active' ? 'bg-primary-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                                            <i className={item.icon} aria-hidden="true"></i>
                                        </div>
                                        <div className={`card flex-1 card-hover-lift ${item.status === 'active' ? 'border-2 border-primary-200' : ''}`}>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'active' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>{item.phase}</span>
                                            <h3 className="font-heading font-bold text-lg mt-2 text-gray-900">{item.title}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 sm:py-20 bg-white" aria-labelledby="team-heading">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateOnScroll>
                        <h2 id="team-heading" className="section-title">Meet the <span className="text-gradient">Team</span></h2>
                        <p className="section-subtitle">The passionate minds behind DivyangSahay</p>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-stagger">
                        {team.map((member, i) => (
                            <AnimateOnScroll key={i} variant="scale">
                                <div className="card text-center group card-hover-lift">
                                    <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform duration-300`}><i className={member.icon} aria-hidden="true"></i></div>
                                    <h3 className="font-heading font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="contact-heading">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateOnScroll>
                        <h2 id="contact-heading" className="section-title">Get In <span className="text-gradient">Touch</span></h2>
                        <p className="section-subtitle">Have questions or suggestions? We&apos;d love to hear from you.</p>
                    </AnimateOnScroll>
                    <AnimateOnScroll variant="scale">
                        <form onSubmit={handleContactSubmit} className="card" noValidate aria-label="Contact form">
                            <div className="mb-4">
                                <label htmlFor="contact-name" className="form-label">Name <span className="text-danger">*</span></label>
                                <input type="text" id="contact-name" name="name" value={contactForm.name} onChange={handleContactChange} className="form-field" placeholder="Your name" aria-required="true" aria-invalid={!!contactErrors.name} />
                                {contactErrors.name && <p className="form-error" role="alert"><i className="fas fa-exclamation-circle" aria-hidden="true"></i>{contactErrors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="contact-email" className="form-label">Email <span className="text-danger">*</span></label>
                                <input type="email" id="contact-email" name="email" value={contactForm.email} onChange={handleContactChange} className="form-field" placeholder="you@example.com" aria-required="true" aria-invalid={!!contactErrors.email} />
                                {contactErrors.email && <p className="form-error" role="alert"><i className="fas fa-exclamation-circle" aria-hidden="true"></i>{contactErrors.email}</p>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="contact-message" className="form-label">Message <span className="text-danger">*</span></label>
                                <textarea id="contact-message" name="message" value={contactForm.message} onChange={handleContactChange} className="form-field" rows="4" placeholder="Your message..." aria-required="true" aria-invalid={!!contactErrors.message}></textarea>
                                {contactErrors.message && <p className="form-error" role="alert"><i className="fas fa-exclamation-circle" aria-hidden="true"></i>{contactErrors.message}</p>}
                            </div>
                            <button type="submit" className="btn-primary w-full"><i className="fas fa-paper-plane" aria-hidden="true"></i>Send Message</button>
                        </form>
                    </AnimateOnScroll>
                </div>
            </section>
        </div>
    );
}
