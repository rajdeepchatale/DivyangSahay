import { Link } from 'react-router-dom';

const footerLinks = {
    quickLinks: [
        { to: '/', label: 'Home' },
        { to: '/eligibility', label: 'Check Eligibility' },
        { to: '/csc-locator', label: 'Find Help Center' },
        { to: '/about', label: 'About Us' },
    ],
    resources: [
        { href: '#', label: 'Privacy Policy' },
        { href: '#', label: 'Terms of Service' },
        { href: '#', label: 'Accessibility Statement' },
        { href: '#', label: 'Contact Us' },
    ],
    government: [
        { href: 'https://disabilityaffairs.gov.in', label: 'Dept. of Empowerment of PwD', external: true },
        { href: 'https://www.swavlambancard.gov.in', label: 'UDID Portal', external: true },
        { href: 'https://www.csc.gov.in', label: 'CSC Portal', external: true },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 no-print" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="fas fa-wheelchair text-2xl text-primary-400" aria-hidden="true"></i>
                            <span className="font-heading font-bold text-xl text-white">
                                Divyang<span className="text-secondary-400">Sahay</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4">
                            AI-powered benefit assistant helping persons with disabilities in India discover
                            and claim government benefits they deserve.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3" aria-label="Social media links">
                            {[
                                { icon: 'fab fa-twitter', label: 'Twitter', href: '#' },
                                { icon: 'fab fa-facebook', label: 'Facebook', href: '#' },
                                { icon: 'fab fa-linkedin', label: 'LinkedIn', href: '#' },
                                { icon: 'fab fa-youtube', label: 'YouTube', href: '#' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-200"
                                    aria-label={`Follow us on ${social.label}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className={social.icon} aria-hidden="true"></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-bold text-white text-base mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                                    >
                                        <i className="fas fa-chevron-right text-xs text-primary-400" aria-hidden="true"></i>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-heading font-bold text-white text-base mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                                    >
                                        <i className="fas fa-chevron-right text-xs text-primary-400" aria-hidden="true"></i>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Government Links */}
                    <div>
                        <h3 className="font-heading font-bold text-white text-base mb-4">Government Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.government.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fas fa-external-link-alt text-xs text-primary-400" aria-hidden="true"></i>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} DivyangSahay. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex -space-x-1">
                            {['🧠', '📝', '🌐', '📍', '🔍', '🔔', '💬', '🎤'].map((e, i) => (
                                <span key={i} className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-[10px] border border-gray-700">{e}</span>
                            ))}
                        </div>
                        <span>Powered by 8 AI Agents</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
