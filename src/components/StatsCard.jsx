import { useState, useEffect, useRef } from 'react';

export default function StatsCard({ icon, value, label, suffix = '', prefix = '', delay = 0 }) {
    const [displayValue, setDisplayValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) {
            setDisplayValue(value);
            return;
        }

        const duration = 1500;
        const startTime = Date.now();
        const timer = setTimeout(() => {
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplayValue(Math.floor(numericValue * eased));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timer);
    }, [isVisible, value, delay]);

    return (
        <div
            ref={cardRef}
            className={`card text-center group hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate-bounce-in' : 'opacity-0'
                }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="text-4xl mb-3" aria-hidden="true">
                {icon}
            </div>
            <p className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-2">
                <span aria-hidden="true">{prefix}{typeof displayValue === 'number' ? displayValue.toLocaleString('en-IN') : displayValue}{suffix}</span>
                <span className="sr-only">{prefix}{value}{suffix}</span>
            </p>
            <p className="text-gray-600 font-medium">{label}</p>
        </div>
    );
}
