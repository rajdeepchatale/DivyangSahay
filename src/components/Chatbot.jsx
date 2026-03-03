import { useState, useRef, useEffect } from 'react';
import { chatWithAI, isAIAvailable } from '../services/aiService';

const quickReplies = [
    'How do I check eligibility?',
    'What documents do I need?',
    'Tell me about UDID',
    'Where is the nearest CSC?',
    'What scholarships are available?',
    'How to get a wheelchair?',
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hey there! 👋 I\'m Sahay, your personal DivyangSahay guide. I help people like you discover government benefits you deserve — pensions, scholarships, free assistive devices, and so much more.\n\nWhat can I help you with today?' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (isOpen && chatRef.current && !chatRef.current.contains(e.target) && !e.target.closest('#chatbot-toggle-btn')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    const handleSend = async (text) => {
        const userMessage = typeof text === 'string' ? text : inputValue.trim();
        if (!userMessage) return;
        if (typeof text !== 'string') setInputValue('');

        setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
        setIsTyping(true);

        try {
            const response = await chatWithAI(userMessage);
            setMessages(prev => [...prev, { from: 'bot', text: response }]);
        } catch {
            setMessages(prev => [...prev, { from: 'bot', text: 'I apologize, I encountered an error. Please try asking again or check our Eligibility page for instant help!' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSend();
    };

    return (
        <>
            {/* Floating Button — Bottom Right, prominent */}
            <button
                id="chatbot-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed right-6 bottom-6 z-50 flex items-center gap-2 shadow-xl transition-all duration-300 transform hover:scale-105 no-print"
                style={{
                    background: isOpen
                        ? 'linear-gradient(135deg, #dc3545, #c82333)'
                        : 'linear-gradient(135deg, #007bff, #28a745)',
                    borderRadius: isOpen ? '50%' : '28px',
                    padding: isOpen ? '14px' : '12px 20px',
                }}
                aria-label={isOpen ? 'Close assistant chat' : 'Open assistant chat'}
                aria-expanded={isOpen}
                aria-controls="chatbot-window"
                title={isOpen ? 'Close chat' : 'Chat with DivyangSahay AI'}
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-white text-lg`} aria-hidden="true"></i>
                {!isOpen && <span className="text-white font-semibold text-sm hidden sm:inline">Ask AI</span>}
                {/* Agent badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                        7
                    </span>
                )}
            </button>

            {/* Notification pulse when closed */}
            {!isOpen && (
                <span className="fixed right-5 bottom-5 z-40 w-16 h-16 rounded-full no-print" aria-hidden="true"
                    style={{
                        background: 'linear-gradient(135deg, #007bff, #28a745)',
                        opacity: 0.3,
                        animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
                    }}
                ></span>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    id="chatbot-window"
                    ref={chatRef}
                    className="chatbot-panel fixed right-6 bottom-24 z-50 w-[340px] sm:w-[400px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden no-print"
                    style={{ maxHeight: '75vh', background: '#fff' }}
                    role="dialog"
                    aria-label="DivyangSahay AI Assistant"
                >
                    {/* Header */}
                    <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #007bff, #0056b3)' }}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <i className="fas fa-robot text-white text-lg" aria-hidden="true"></i>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="text-white font-bold text-sm">DivyangSahay AI</p>
                                <span className="text-[10px] bg-white/20 text-white/90 px-1.5 py-0.5 rounded-full font-medium">Agent 7</span>
                                {isAIAvailable() && (
                                    <span className="text-[10px] bg-green-400/30 text-green-100 px-1.5 py-0.5 rounded-full font-medium">
                                        <i className="fas fa-bolt mr-0.5" aria-hidden="true"></i>Gemini
                                    </span>
                                )}
                            </div>
                            <p className="text-blue-100 text-xs flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" aria-hidden="true"></span>
                                Your personal benefit guide • Online
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white p-1 rounded transition-colors"
                            aria-label="Close chat"
                        >
                            <i className="fas fa-chevron-down" aria-hidden="true"></i>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages-area flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ minHeight: '220px', maxHeight: '45vh' }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.from === 'bot' && (
                                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                                        <i className="fas fa-robot text-primary-500 text-xs" aria-hidden="true"></i>
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.from === 'user'
                                        ? 'bg-primary-500 text-white rounded-br-md'
                                        : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center mr-2 flex-shrink-0">
                                    <i className="fas fa-robot text-primary-500 text-xs" aria-hidden="true"></i>
                                </div>
                                <div className="bg-white text-gray-400 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 text-sm">
                                    <span className="inline-flex gap-1">
                                        <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="px-3 py-2 border-t border-gray-100 bg-white">
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                            {quickReplies.map((qr, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(qr)}
                                    className="flex-shrink-0 text-xs bg-primary-50 text-primary-600 px-2.5 py-1.5 rounded-full hover:bg-primary-100 transition-colors font-medium whitespace-nowrap"
                                >
                                    {qr}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="px-3 py-2.5 border-t border-gray-100 bg-white flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about schemes, eligibility, documents..."
                            className="flex-1 px-3.5 py-2.5 rounded-full bg-gray-100 text-sm border-0 focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all outline-none"
                            aria-label="Type your message"
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors flex-shrink-0 disabled:opacity-50"
                            aria-label="Send message"
                            disabled={!inputValue.trim() || isTyping}
                        >
                            <i className="fas fa-paper-plane text-sm" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
