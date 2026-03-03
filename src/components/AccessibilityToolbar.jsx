import { useApp } from '../context/AppContext';

export default function AccessibilityToolbar() {
    const { state, dispatch } = useApp();
    const { highContrast, fontScale } = state.accessibilitySettings;

    const toggleHighContrast = () => {
        dispatch({ type: 'SET_HIGH_CONTRAST', payload: !highContrast });
    };

    const increaseFontSize = () => {
        dispatch({ type: 'SET_FONT_SCALE', payload: fontScale + 0.1 });
    };

    const decreaseFontSize = () => {
        dispatch({ type: 'SET_FONT_SCALE', payload: fontScale - 0.1 });
    };

    const resetFontSize = () => {
        dispatch({ type: 'SET_FONT_SCALE', payload: 1 });
    };

    return (
        <div
            className="flex items-center gap-1 sm:gap-2 flex-wrap"
            role="toolbar"
            aria-label="Accessibility options"
        >
            {/* High Contrast Toggle */}
            <button
                onClick={toggleHighContrast}
                className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${highContrast
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                aria-pressed={highContrast}
                aria-label={`High contrast mode: ${highContrast ? 'on' : 'off'}`}
                title="Toggle high contrast mode"
            >
                <i className="fas fa-adjust" aria-hidden="true"></i>
                <span className="hidden sm:inline">Contrast</span>
            </button>

            {/* Font Size Controls */}
            <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5" role="group" aria-label="Font size controls">
                <button
                    onClick={decreaseFontSize}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                    aria-label="Decrease font size"
                    title="Decrease font size"
                    disabled={fontScale <= 0.85}
                >
                    <i className="fas fa-minus" aria-hidden="true"></i>
                    <span className="sr-only">A-</span>
                </button>
                <button
                    onClick={resetFontSize}
                    className="px-2 py-1 rounded-md text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
                    aria-label={`Current font scale: ${Math.round(fontScale * 100)}%. Click to reset`}
                    title="Reset font size"
                >
                    <span aria-hidden="true">A</span>
                </button>
                <button
                    onClick={increaseFontSize}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                    aria-label="Increase font size"
                    title="Increase font size"
                    disabled={fontScale >= 1.5}
                >
                    <i className="fas fa-plus" aria-hidden="true"></i>
                    <span className="sr-only">A+</span>
                </button>
            </div>

            {/* Screen Reader Info */}
            <button
                className="p-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1"
                aria-label="Accessibility information"
                title="This site is screen reader compatible"
                onClick={() => {
                    const el = document.getElementById('main-content');
                    if (el) el.focus();
                }}
            >
                <i className="fas fa-universal-access" aria-hidden="true"></i>
                <span className="hidden sm:inline">A11y</span>
            </button>
        </div>
    );
}
