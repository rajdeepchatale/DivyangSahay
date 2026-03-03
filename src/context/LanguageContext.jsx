import { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    const t = useCallback((path) => {
        const keys = path.split('.');
        let result = translations[language];
        for (const key of keys) {
            result = result?.[key];
        }
        // Fallback to English
        if (!result) {
            result = translations.en;
            for (const key of keys) {
                result = result?.[key];
            }
        }
        return result || path;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
