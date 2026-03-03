import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { voiceWithAI, isAIAvailable } from '../services/aiService';

const langCodeMap = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', mr: 'mr-IN' };

// Strip emojis and special unicode characters so TTS doesn't read them as descriptions
function stripEmojis(text) {
    return text
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // emoticons
        .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // misc symbols
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // transport
        .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // flags
        .replace(/[\u{2600}-\u{26FF}]/gu, '')   // misc symbols
        .replace(/[\u{2700}-\u{27BF}]/gu, '')   // dingbats
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '')   // variation selectors
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // supplemental
        .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // chess symbols
        .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // symbols extended
        .replace(/[\u{200D}]/gu, '')             // zero width joiner
        .replace(/[\u{FE0F}]/gu, '')             // variation selector
        .replace(/[\u{20E3}]/gu, '')             // combining enclosing keycap
        .replace(/\s{2,}/g, ' ')                 // collapse multiple spaces
        .trim();
}

export default function VoiceAssistant() {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [status, setStatus] = useState('idle'); // idle | listening | processing | speaking
    const [ttsSpeed, setTtsSpeed] = useState(0.9);
    const [showHelp, setShowHelp] = useState(false);
    const [history, setHistory] = useState([]);
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const panelRef = useRef(null);

    const speechLang = langCodeMap[language] || 'en-IN';

    // Navigation commands — handled instantly without AI
    const navCommands = [
        { patterns: ['check eligibility', 'eligibility', 'check my eligibility', 'पात्रता', 'தகுதி'], target: '/eligibility', reply: 'Opening eligibility check page.' },
        { patterns: ['find csc', 'help center', 'nearest center', 'csc locator', 'सहायता केंद्र'], target: '/csc-locator', reply: 'Opening CSC locator page.' },
        { patterns: ['go home', 'home page', 'main page', 'होम', 'முகப்பு'], target: '/', reply: 'Going to home page.' },
        { patterns: ['about', 'about page', 'हमारे बारे में'], target: '/about', reply: 'Opening about page.' },
    ];

    const actionCommands = [
        { patterns: ['help', 'commands', 'what can you do', 'मदद', 'உதவி', 'సహాయం'], action: 'help' },
        { patterns: ['increase font', 'bigger text', 'बड़ा फॉन्ट'], action: 'font-up' },
        { patterns: ['decrease font', 'smaller text', 'छोटा फॉन्ट'], action: 'font-down' },
        { patterns: ['high contrast', 'contrast mode', 'dark mode', 'कंट्रास्ट'], action: 'contrast' },
        { patterns: ['stop', 'cancel', 'close', 'बंद', 'நிறுத்து'], action: 'close' },
    ];

    // Cancel all speech and recognition immediately
    const cancelEverything = useCallback(() => {
        // Stop TTS immediately
        if (synthRef.current) {
            synthRef.current.cancel();
        }
        // Stop speech recognition
        if (recognitionRef.current) {
            try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
            recognitionRef.current = null;
        }
        setIsListening(false);
        setStatus('idle');
    }, []);

    // Keyboard shortcut Alt+V
    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.altKey && e.key === 'v') {
                e.preventDefault();
                setIsOpen(prev => {
                    if (prev) cancelEverything(); // Cancel on close
                    return !prev;
                });
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [cancelEverything]);

    // Close on outside click — also cancel speech
    useEffect(() => {
        const handleClick = (e) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(e.target)) {
                if (!e.target.closest('#voice-assistant-btn')) {
                    cancelEverything();
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen, cancelEverything]);

    // When panel closes, ALWAYS cancel TTS and recognition
    useEffect(() => {
        if (!isOpen) {
            cancelEverything();
        }
    }, [isOpen, cancelEverything]);

    // Cleanup on unmount
    useEffect(() => {
        return () => cancelEverything();
    }, [cancelEverything]);

    const speak = useCallback((text) => {
        if (!synthRef.current) return;
        synthRef.current.cancel(); // Cancel any existing speech first

        // Strip emojis from text before speaking
        const cleanText = stripEmojis(text);
        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = speechLang;
        utterance.rate = ttsSpeed;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        setStatus('speaking');
        utterance.onend = () => setStatus('idle');
        utterance.onerror = () => setStatus('idle');
        synthRef.current.speak(utterance);
    }, [speechLang, ttsSpeed]);

    const processCommand = useCallback(async (text) => {
        const lower = text.toLowerCase().trim();
        setTranscript(text);

        // 1. Check navigation commands (instant)
        for (const cmd of navCommands) {
            if (cmd.patterns.some(p => lower.includes(p))) {
                setResponse(cmd.reply);
                speak(cmd.reply);
                setHistory(prev => [...prev, { q: text, a: cmd.reply }]);
                setTimeout(() => navigate(cmd.target), 800);
                return;
            }
        }

        // 2. Check action commands (instant)
        for (const cmd of actionCommands) {
            if (cmd.patterns.some(p => lower.includes(p))) {
                if (cmd.action === 'help') {
                    setShowHelp(true);
                    const reply = 'Here are the available voice commands.';
                    setResponse(reply);
                    speak(reply);
                } else if (cmd.action === 'font-up') {
                    document.documentElement.style.setProperty('--font-scale', '1.2');
                    const reply = 'Text size increased.';
                    setResponse(reply);
                    speak(reply);
                } else if (cmd.action === 'font-down') {
                    document.documentElement.style.setProperty('--font-scale', '0.9');
                    const reply = 'Text size decreased.';
                    setResponse(reply);
                    speak(reply);
                } else if (cmd.action === 'contrast') {
                    document.documentElement.classList.toggle('high-contrast');
                    const reply = 'High contrast mode toggled.';
                    setResponse(reply);
                    speak(reply);
                } else if (cmd.action === 'close') {
                    speak('Closing voice assistant.');
                    setTimeout(() => {
                        cancelEverything();
                        setIsOpen(false);
                    }, 1500);
                }
                return;
            }
        }

        // 3. Send to Gemini AI for everything else
        setStatus('processing');
        setResponse('Thinking...');
        try {
            const aiResponse = await voiceWithAI(text);
            setResponse(aiResponse);
            speak(aiResponse);
            setHistory(prev => [...prev, { q: text, a: aiResponse }]);
        } catch (err) {
            console.error('Voice AI error:', err);
            const fallback = 'I had trouble understanding that. Try asking about eligibility, pensions, documents, or say help for commands.';
            setResponse(fallback);
            speak(fallback);
        }
    }, [speak, navigate, cancelEverything]);

    const startListening = useCallback(() => {
        // Cancel any ongoing TTS before listening
        if (synthRef.current) synthRef.current.cancel();

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setResponse('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
            speak('Voice recognition is not supported in this browser.');
            return;
        }

        // Stop any existing recognition first
        if (recognitionRef.current) {
            try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
        }

        const recognition = new SpeechRecognition();
        recognition.lang = speechLang;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setStatus('listening');
            setTranscript('');
            setResponse('');
            setShowHelp(false);
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            if (interimTranscript) {
                setTranscript(interimTranscript);
            }
            if (finalTranscript) {
                setTranscript(finalTranscript);
                setIsListening(false);
                processCommand(finalTranscript);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (e) => {
            console.error('Speech recognition error:', e.error);
            setIsListening(false);
            setStatus('idle');
            if (e.error === 'not-allowed') {
                setResponse('Microphone access denied. Please allow microphone access in your browser settings.');
                speak('Microphone access denied. Please allow microphone in your browser settings.');
            } else if (e.error === 'no-speech') {
                setResponse('No speech detected. Please try again.');
            } else if (e.error === 'network') {
                setResponse('Network error. Please check your internet connection.');
            }
        };

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch (e) {
            console.error('Failed to start recognition:', e);
            setResponse('Could not start voice recognition. Please try again.');
        }
    }, [speechLang, processCommand, speak]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
        }
        setIsListening(false);
    }, []);

    const toggleListen = () => {
        if (isListening) stopListening();
        else startListening();
    };

    // Close handler for the button — cancel everything
    const handleClose = () => {
        cancelEverything();
        setIsOpen(false);
    };

    const handleToggle = () => {
        if (isOpen) {
            handleClose();
        } else {
            setIsOpen(true);
        }
    };

    const statusText = () => {
        if (isListening) return t('voiceAssistant.listening');
        if (status === 'processing') return 'Processing with AI...';
        if (status === 'speaking') return 'Speaking...';
        return t('voiceAssistant.tapToSpeak');
    };

    return (
        <>
            {/* Floating Mic Button — Bottom Left */}
            <button
                id="voice-assistant-btn"
                onClick={handleToggle}
                className="fixed left-6 bottom-6 z-50 flex items-center gap-2 shadow-xl transition-all duration-300 transform hover:scale-105 no-print"
                style={{
                    background: isListening
                        ? 'linear-gradient(135deg, #dc3545, #e83e8c)'
                        : isOpen
                            ? 'linear-gradient(135deg, #dc3545, #c82333)'
                            : 'linear-gradient(135deg, #6f42c1, #007bff)',
                    borderRadius: isOpen ? '50%' : '28px',
                    padding: isOpen ? '14px' : '12px 20px',
                }}
                aria-label={t('voiceAssistant.title')}
                title="Voice Assistant (Alt+V)"
            >
                <i className={`fas ${isOpen ? 'fa-times' : isListening ? 'fa-stop' : 'fa-microphone-alt'} text-white text-lg`} aria-hidden="true"></i>
                {!isOpen && <span className="text-white font-semibold text-sm hidden sm:inline">Voice</span>}
                {isListening && !isOpen && (
                    <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-60" aria-hidden="true"></span>
                )}
                {/* Agent 8 badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                        8
                    </span>
                )}
            </button>

            {/* Pulse when closed */}
            {!isOpen && !isListening && (
                <span className="fixed left-5 bottom-5 z-40 w-16 h-16 rounded-full no-print" aria-hidden="true"
                    style={{
                        background: 'linear-gradient(135deg, #6f42c1, #007bff)',
                        opacity: 0.25,
                        animation: 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
                    }}
                ></span>
            )}

            {/* Voice Panel */}
            {isOpen && (
                <div
                    ref={panelRef}
                    className="voice-panel-bg fixed left-6 bottom-24 z-50 w-[340px] sm:w-[380px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 no-print"
                    role="dialog"
                    aria-label={t('voiceAssistant.title')}
                    aria-live="polite"
                >
                    {/* Header */}
                    <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #6f42c1, #007bff)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <i className="fas fa-microphone-alt text-white" aria-hidden="true"></i>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-white font-bold text-sm">{t('voiceAssistant.title')}</h3>
                                    <span className="text-[10px] bg-white/20 text-white/90 px-1.5 py-0.5 rounded-full">Agent 8</span>
                                    {isAIAvailable() && (
                                        <span className="text-[10px] bg-green-400/30 text-green-100 px-1.5 py-0.5 rounded-full font-medium">
                                            <i className="fas fa-bolt mr-0.5" aria-hidden="true"></i>Gemini
                                        </span>
                                    )}
                                </div>
                                <p className="text-white/70 text-[11px]">Speak or ask anything about your benefits</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            aria-label="Close voice assistant"
                        >
                            <i className="fas fa-times text-xs" aria-hidden="true"></i>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                        {/* Mic button */}
                        <div className="flex items-center justify-center mb-4">
                            <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isListening
                                    ? 'bg-red-50 border-2 border-red-300 scale-110'
                                    : status === 'processing'
                                        ? 'bg-yellow-50 border-2 border-yellow-300 animate-pulse'
                                        : status === 'speaking'
                                            ? 'bg-purple-50 border-2 border-purple-300'
                                            : 'bg-gray-50 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                                    }`}
                                onClick={toggleListen}
                                role="button"
                                aria-label={isListening ? 'Stop listening' : 'Start listening'}
                            >
                                {isListening ? (
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div
                                                key={i}
                                                className="w-1 bg-red-500 rounded-full"
                                                style={{
                                                    height: `${8 + Math.random() * 16}px`,
                                                    animation: `pulse ${0.3 + i * 0.1}s ease-in-out infinite alternate`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : status === 'processing' ? (
                                    <i className="fas fa-spinner fa-spin text-yellow-500 text-2xl" aria-hidden="true"></i>
                                ) : status === 'speaking' ? (
                                    <i className="fas fa-volume-up text-purple-500 text-2xl animate-pulse" aria-hidden="true"></i>
                                ) : (
                                    <i className="fas fa-microphone-alt text-gray-400 text-2xl" aria-hidden="true"></i>
                                )}
                            </div>
                        </div>

                        {/* Status text */}
                        <p className="text-center text-sm font-medium mb-3 text-gray-600">{statusText()}</p>

                        {/* Transcript */}
                        {transcript && (
                            <div className="mb-3 p-3 rounded-xl bg-gray-50 border border-gray-100 voice-transcript">
                                <p className="text-xs text-gray-400 mb-1 font-medium">
                                    <i className="fas fa-user mr-1" aria-hidden="true"></i> You said:
                                </p>
                                <p className="text-sm text-gray-800">{transcript}</p>
                            </div>
                        )}

                        {/* Response */}
                        {response && (
                            <div className="mb-3 p-3 rounded-xl border voice-response-box">
                                <p className="text-xs text-purple-500 mb-1 font-medium">
                                    <i className="fas fa-robot mr-1" aria-hidden="true"></i>
                                    AI Assistant:
                                </p>
                                <p className="text-sm text-gray-800 whitespace-pre-line">{response}</p>
                            </div>
                        )}

                        {/* Stop speaking button — visible when AI is speaking */}
                        {status === 'speaking' && (
                            <button
                                onClick={() => { if (synthRef.current) synthRef.current.cancel(); setStatus('idle'); }}
                                className="w-full mb-3 py-2 px-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-stop" aria-hidden="true"></i> Stop Speaking
                            </button>
                        )}

                        {/* Help commands */}
                        {showHelp && (
                            <div className="mb-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                                <p className="text-xs font-bold text-blue-600 mb-2">
                                    <i className="fas fa-list mr-1" aria-hidden="true"></i>
                                    {t('voiceAssistant.commands')}:
                                </p>
                                <ul className="space-y-1 text-xs text-gray-600">
                                    <li><strong>"Check eligibility"</strong> → Open eligibility page</li>
                                    <li><strong>"Find CSC"</strong> → Open CSC locator</li>
                                    <li><strong>"Go home"</strong> → Navigate home</li>
                                    <li><strong>"High contrast"</strong> → Toggle contrast</li>
                                    <li><strong>"Increase font"</strong> → Bigger text</li>
                                    <li><strong>"Help"</strong> → Show commands</li>
                                    <li><strong>Any question</strong> → AI answers about schemes!</li>
                                </ul>
                            </div>
                        )}

                        {/* Recent conversation */}
                        {history.length > 0 && !showHelp && (
                            <div className="mb-3">
                                <p className="text-xs text-gray-400 font-medium mb-2">Recent</p>
                                <div className="space-y-2 max-h-24 overflow-y-auto">
                                    {history.slice(-3).map((h, i) => (
                                        <div key={i} className="text-xs text-gray-500 p-2 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700 font-medium">Q:</span> {h.q.slice(0, 40)}...
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TTS Speed */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-400 font-medium">
                                <i className="fas fa-tachometer-alt mr-1" aria-hidden="true"></i>
                                Speed
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setTtsSpeed(s => Math.max(0.5, s - 0.1))}
                                    className="w-6 h-6 rounded bg-gray-100 text-gray-500 text-xs flex items-center justify-center hover:bg-gray-200"
                                    aria-label="Slower"
                                >−</button>
                                <span className="text-xs font-mono text-gray-600 w-8 text-center">{ttsSpeed.toFixed(1)}×</span>
                                <button
                                    onClick={() => setTtsSpeed(s => Math.min(1.5, s + 0.1))}
                                    className="w-6 h-6 rounded bg-gray-100 text-gray-500 text-xs flex items-center justify-center hover:bg-gray-200"
                                    aria-label="Faster"
                                >+</button>
                            </div>
                        </div>

                        <p className="text-center text-[10px] text-gray-400 mt-3">
                            {t('voiceAssistant.helpText')} • Alt+V
                        </p>
                    </div>
                </div>
            )}

            {/* Screen reader announcements */}
            <div aria-live="assertive" className="sr-only" role="status">
                {isListening && t('voiceAssistant.speakNow')}
                {response && response}
            </div>
        </>
    );
}
