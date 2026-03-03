import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const toastConfig = {
    success: {
        bg: 'bg-secondary-500',
        icon: 'fas fa-check-circle',
        label: 'Success',
    },
    error: {
        bg: 'bg-danger',
        icon: 'fas fa-exclamation-circle',
        label: 'Error',
    },
    warning: {
        bg: 'bg-warning',
        icon: 'fas fa-exclamation-triangle',
        textColor: 'text-gray-900',
        label: 'Warning',
    },
    info: {
        bg: 'bg-primary-500',
        icon: 'fas fa-info-circle',
        label: 'Information',
    },
};

function ToastItem({ toast, onDismiss }) {
    const config = toastConfig[toast.type] || toastConfig.info;

    useEffect(() => {
        if (toast.duration > 0) {
            const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
            return () => clearTimeout(timer);
        }
    }, [toast.id, toast.duration, onDismiss]);

    return (
        <div
            className={`${config.bg} ${config.textColor || 'text-white'} rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 max-w-sm animate-slide-down`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <i className={`${config.icon} text-lg flex-shrink-0`} aria-hidden="true"></i>
            <div className="flex-1">
                <span className="sr-only">{config.label}:</span>
                <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
                onClick={() => onDismiss(toast.id)}
                className={`flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors ${config.textColor || 'text-white'}`}
                aria-label="Dismiss notification"
            >
                <i className="fas fa-times" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default function Toast() {
    const { state, dispatch } = useApp();

    const dismissToast = (id) => {
        dispatch({ type: 'REMOVE_TOAST', payload: id });
    };

    if (state.toasts.length === 0) return null;

    return (
        <div
            className="fixed top-20 right-4 z-[60] flex flex-col gap-2"
            aria-label="Notifications"
        >
            {state.toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
            ))}
        </div>
    );
}
