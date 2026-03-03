export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-8" role="status" aria-label={text}>
            <div
                className={`${sizeClasses[size]} border-gray-200 border-t-primary-500 rounded-full animate-spin`}
                aria-hidden="true"
            ></div>
            <p className="text-sm text-gray-500 font-medium">{text}</p>
            <span className="sr-only">{text}</span>
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="card animate-pulse" aria-hidden="true" role="presentation">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
    );
}

export function ProgressBar({ progress, label }) {
    return (
        <div className="w-full" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label={label}>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-medium text-primary-500">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
