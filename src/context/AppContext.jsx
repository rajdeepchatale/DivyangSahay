import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const AppContext = createContext(null);

const initialState = {
    userProfile: null,
    eligibilityResults: null,
    accessibilitySettings: {
        highContrast: false,
        fontScale: 1,
        language: 'en',
    },
    toasts: [],
    isLoading: false,
    consentGiven: false,
};

function appReducer(state, action) {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return { ...state, userProfile: action.payload };
        case 'SET_ELIGIBILITY_RESULTS':
            return { ...state, eligibilityResults: action.payload };
        case 'SET_HIGH_CONTRAST':
            return {
                ...state,
                accessibilitySettings: { ...state.accessibilitySettings, highContrast: action.payload },
            };
        case 'SET_FONT_SCALE':
            return {
                ...state,
                accessibilitySettings: {
                    ...state.accessibilitySettings,
                    fontScale: Math.min(1.5, Math.max(0.85, action.payload)),
                },
            };
        case 'SET_LANGUAGE':
            return {
                ...state,
                accessibilitySettings: { ...state.accessibilitySettings, language: action.payload },
            };
        case 'ADD_TOAST':
            return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };
        case 'REMOVE_TOAST':
            return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_CONSENT':
            return { ...state, consentGiven: action.payload };
        case 'LOAD_SETTINGS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load persisted settings on mount
    useEffect(() => {
        const savedSettings = loadFromStorage('accessibility');
        const savedProfile = loadFromStorage('profile');
        const savedConsent = loadFromStorage('consent');
        if (savedSettings || savedProfile || savedConsent) {
            dispatch({
                type: 'LOAD_SETTINGS',
                payload: {
                    accessibilitySettings: savedSettings || initialState.accessibilitySettings,
                    userProfile: savedProfile || null,
                    consentGiven: savedConsent || false,
                },
            });
        }
    }, []);

    // Persist accessibility settings
    useEffect(() => {
        saveToStorage('accessibility', state.accessibilitySettings);
        // Apply high contrast
        if (state.accessibilitySettings.highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
        // Apply font scale
        document.documentElement.style.setProperty('--font-scale', state.accessibilitySettings.fontScale);
    }, [state.accessibilitySettings]);

    // Persist profile
    useEffect(() => {
        if (state.consentGiven && state.userProfile) {
            saveToStorage('profile', state.userProfile);
        }
    }, [state.userProfile, state.consentGiven]);

    const addToast = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now();
        dispatch({ type: 'ADD_TOAST', payload: { message, type, duration } });
        if (duration > 0) {
            setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), duration);
        }
    }, []);

    const value = { state, dispatch, addToast };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
