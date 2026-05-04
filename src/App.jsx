import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect, Component } from 'react';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Chatbot from './components/Chatbot';
import VoiceAssistant from './components/VoiceAssistant';
import Home from './pages/Home';
import EligibilityCheck from './pages/EligibilityCheck';
import Results from './pages/Results';
import ApplicationDraft from './pages/ApplicationDraft';
import CSCLocator from './pages/CSCLocator';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** 404 Not Found page for unmatched routes */
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="text-8xl mb-6" aria-hidden="true">🔍</div>
      <h1 className="text-4xl font-heading font-bold text-gray-900 mb-3">
        Page Not Found
      </h1>
      <p className="text-lg text-gray-500 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <Link
        to="/"
        className="btn-primary text-lg px-8 py-3"
      >
        <i className="fas fa-home" aria-hidden="true"></i>
        Back to Home
      </Link>
    </div>
  );
}

/** Error Boundary to gracefully handle runtime errors */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('DivyangSahay Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
          <div className="text-7xl mb-6" aria-hidden="true">⚠️</div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-3">
            Something went wrong
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary text-lg px-8 py-3"
          >
            <i className="fas fa-redo" aria-hidden="true"></i>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toast />
      <main id="main-content" className="flex-1" tabIndex="-1" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eligibility" element={<EligibilityCheck />} />
          <Route path="/results" element={<Results />} />
          <Route path="/application" element={<ApplicationDraft />} />
          <Route path="/csc-locator" element={<CSCLocator />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <VoiceAssistant />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <LanguageProvider>
          <Router>
            <AppLayout />
          </Router>
        </LanguageProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
