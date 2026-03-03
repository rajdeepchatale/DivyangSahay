import { useState, useRef, useEffect } from 'react';

const sampleNotifications = [
    {
        id: 1,
        type: 'deadline',
        title: 'UDID Registration Deadline',
        message: 'Last date to apply for UDID card renewal is approaching — 15 days remaining.',
        time: '2 hours ago',
        icon: 'fas fa-clock',
        color: 'text-accent-500',
        unread: true,
    },
    {
        id: 2,
        type: 'status',
        title: 'Application Status Update',
        message: 'Your Disability Pension application has been received by the district office.',
        time: '1 day ago',
        icon: 'fas fa-check-circle',
        color: 'text-secondary-500',
        unread: true,
    },
    {
        id: 3,
        type: 'reminder',
        title: 'Document Submission Reminder',
        message: 'Please submit your income certificate at the nearest CSC center.',
        time: '2 days ago',
        icon: 'fas fa-file-alt',
        color: 'text-primary-500',
        unread: false,
    },
    {
        id: 4,
        type: 'info',
        title: 'New Scheme Available',
        message: 'A new state-level scholarship scheme for PwD students has been announced.',
        time: '3 days ago',
        icon: 'fas fa-bullhorn',
        color: 'text-primary-500',
        unread: false,
    },
];

export default function NotificationPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(sampleNotifications);
    const panelRef = useRef(null);

    const unreadCount = notifications.filter(n => n.unread).length;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    return (
        <div className="relative" ref={panelRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                aria-expanded={isOpen}
            >
                <i className="fas fa-bell text-lg" aria-hidden="true"></i>
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-in">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-down z-50">
                    {/* Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="agent-badge core text-xs py-1 px-2">
                                    <i className="fas fa-robot text-xs" aria-hidden="true"></i>
                                    Agent 6
                                </div>
                                <h3 className="font-heading font-bold text-sm text-gray-900">Notifications</h3>
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllRead}
                                    className="text-xs text-primary-500 hover:text-primary-700 font-medium"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.map(notif => (
                            <div
                                key={notif.id}
                                className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? 'bg-primary-50/30' : ''}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.unread ? 'bg-primary-100' : 'bg-gray-100'}`}>
                                        <i className={`${notif.icon} ${notif.color} text-sm`} aria-hidden="true"></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className={`text-sm font-semibold ${notif.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                                                {notif.title}
                                            </p>
                                            {notif.unread && (
                                                <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 bg-gray-50 text-center">
                        <button className="text-xs text-primary-500 hover:text-primary-700 font-medium">
                            View All Notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
