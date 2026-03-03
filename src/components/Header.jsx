import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccessibilityToolbar from './AccessibilityToolbar';
import NotificationPanel from './NotificationPanel';
import { useLanguage } from '../context/LanguageContext';
import { supportedLanguages } from '../data/translations';

const navLinks = [
    { to: '/', labelKey: 'nav.home', icon: 'fas fa-home' },
    { to: '/eligibility', labelKey: 'nav.eligibility', icon: 'fas fa-clipboard-check' },
    { to: '/csc-locator', labelKey: 'nav.csc', icon: 'fas fa-map-marker-alt' },
    { to: '/about', labelKey: 'nav.about', icon: 'fas fa-info-circle' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const location = useLocation();
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const langRef = useRef(null);
    const { language, setLanguage, t } = useLanguage();

    const currentLang = supportedLanguages.find(l => l.code === language);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
                hamburgerRef.current?.focus();
            }
            if (e.key === 'Escape' && isLangOpen) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMenuOpen, isLangOpen]);

    useEffect(() => {
        if (isMenuOpen && menuRef.current) {
            const focusableElements = menuRef.current.querySelectorAll('a[href], button');
            if (focusableElements.length > 0) focusableElements[0].focus();
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 no-print" role="banner">
            <a href="#main-content" className="skip-to-content">Skip to main content</a>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-gray-100 py-1">
                    <p className="text-xs text-gray-500 hidden sm:flex items-center gap-1">
                        <i className="fas fa-universal-access" aria-hidden="true"></i>
                        Accessibility-first design • WCAG 2.1 AA Compliant
                    </p>
                    <div className="flex items-center gap-2">
                        {/* Language Selector — Agent 3 */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors border border-gray-200"
                                aria-label="Change language"
                                aria-expanded={isLangOpen}
                            >
                                <i className="fas fa-language text-primary-400" aria-hidden="true"></i>
                                <span>{currentLang?.nativeName}</span>
                                <i className="fas fa-chevron-down text-[10px]" aria-hidden="true"></i>
                            </button>
                            {isLangOpen && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-slide-down z-50">
                                    <div className="px-3 py-2 bg-gradient-to-r from-accent-50 to-primary-50 border-b border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <span className="agent-badge bonus text-[10px] py-0.5 px-1.5">
                                                <i className="fas fa-robot text-[10px]" aria-hidden="true"></i>
                                                Agent 3
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-medium">{t('translation.agent')}</span>
                                        </div>
                                    </div>
                                    {supportedLanguages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                                            className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${language === lang.code ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'}`}
                                        >
                                            <span>{lang.flag}</span>
                                            <span>{lang.nativeName}</span>
                                            <span className="text-xs text-gray-400 ml-auto">{lang.name}</span>
                                            {language === lang.code && <i className="fas fa-check text-primary-500 text-xs ml-1" aria-hidden="true"></i>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <AccessibilityToolbar />
                    </div>
                </div>

                {/* Main navigation */}
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors group"
                        aria-label="DivyangSahay - Home"
                    >
                        <span className="text-2xl sm:text-3xl" aria-hidden="true">
                            <i className="fas fa-wheelchair"></i>
                        </span>
                        <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight">
                            Divyang<span className="text-secondary-500">Sahay</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <nav className="flex items-center gap-1" aria-label="Main navigation">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${location.pathname === link.to
                                        ? 'bg-primary-50 text-primary-600 font-semibold'
                                        : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
                                        }`}
                                    aria-current={location.pathname === link.to ? 'page' : undefined}
                                >
                                    <i className={link.icon} aria-hidden="true"></i>
                                    {t(link.labelKey)}
                                </Link>
                            ))}
                        </nav>

                        {/* Notification Bell — Agent 6 */}
                        <div className="ml-2 border-l border-gray-200 pl-2">
                            <NotificationPanel />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <NotificationPanel />
                        <button
                            ref={hamburgerRef}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        >
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav
                    id="mobile-menu"
                    ref={menuRef}
                    className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down"
                    aria-label="Mobile navigation"
                    role="navigation"
                >
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location.pathname === link.to
                                    ? 'bg-primary-50 text-primary-600 font-semibold'
                                    : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
                                    }`}
                                aria-current={location.pathname === link.to ? 'page' : undefined}
                            >
                                <i className={link.icon} aria-hidden="true"></i>
                                {t(link.labelKey)}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
