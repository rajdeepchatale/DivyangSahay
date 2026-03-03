const STORAGE_KEY_PREFIX = 'divyangsahay_';

export function saveToStorage(key, value) {
    try {
        localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.warn('Failed to save to localStorage:', e);
        return false;
    }
}

export function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.warn('Failed to load from localStorage:', e);
        return defaultValue;
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(STORAGE_KEY_PREFIX + key);
    } catch (e) {
        console.warn('Failed to remove from localStorage:', e);
    }
}

export function clearAllStorage() {
    try {
        Object.keys(localStorage)
            .filter(key => key.startsWith(STORAGE_KEY_PREFIX))
            .forEach(key => localStorage.removeItem(key));
    } catch (e) {
        console.warn('Failed to clear localStorage:', e);
    }
}
