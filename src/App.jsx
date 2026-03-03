import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
    <AppProvider>
      <LanguageProvider>
        <Router>
          <AppLayout />
        </Router>
      </LanguageProvider>
    </AppProvider>
  );
}
