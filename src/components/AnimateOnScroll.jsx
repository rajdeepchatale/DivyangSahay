import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer hook for scroll-triggered animations.
 * Adds 'animate-visible' class when element enters viewport.
 */
export function useScrollAnimation(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
        );

        const el = ref.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);

    return [ref, isVisible];
}

/**
 * Component that animates children on scroll into view.
 * Wrap any section with <AnimateOnScroll> for fade-in-up effect.
 */
export default function AnimateOnScroll({ children, className = '', variant = 'default' }) {
    const [ref, isVisible] = useScrollAnimation();

    const variantClass = variant === 'scale' ? 'animate-scale' : '';

    return (
        <div
            ref={ref}
            className={`animate-on-scroll ${variantClass} ${isVisible ? 'animate-visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
