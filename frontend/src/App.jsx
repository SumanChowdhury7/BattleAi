import { useState, useCallback } from 'react';
import Header from './components/Header.jsx';
import InputSection from './components/InputSection.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import LoadingSection from './components/LoadingSection.jsx';
import ResultsSection from './components/ResultsSection.jsx';
import { fetchBattle } from './api.js';

// UI state machine
const VIEW = { WELCOME: 'welcome', LOADING: 'loading', RESULTS: 'results', ERROR: 'error' };

export default function App() {
  const [view, setView]           = useState(VIEW.WELCOME);
  const [battleData, setBattleData] = useState(null);
  const [battleCount, setBattleCount] = useState(0);
  const [errorMsg, setErrorMsg]   = useState('');

  const handleBattle = useCallback(async (question) => {
    setView(VIEW.LOADING);
    setErrorMsg('');
    try {
      const data = await fetchBattle(question);
      setBattleData(data);
      setBattleCount(c => c + 1);
      setView(VIEW.RESULTS);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setView(VIEW.ERROR);
    }
  }, []);

  const handleNewBattle = useCallback(() => {
    setView(VIEW.WELCOME);
    setBattleData(null);
    setErrorMsg('');
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: '#0c0e18' }}>

      {/* Background grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div aria-hidden="true" className="fixed pointer-events-none z-0"
        style={{
          width: 600, height: 600, top: -200, left: -200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138,62,248,0.45) 0%, transparent 70%)',
          filter: 'blur(100px)', opacity: 0.35,
        }} />
      <div aria-hidden="true" className="fixed pointer-events-none z-0"
        style={{
          width: 500, height: 500, top: '30%', right: -150, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.32) 0%, transparent 70%)',
          filter: 'blur(100px)', opacity: 0.35,
        }} />
      <div aria-hidden="true" className="fixed pointer-events-none z-0"
        style={{
          width: 400, height: 400, bottom: -100, left: '40%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.28) 0%, transparent 70%)',
          filter: 'blur(90px)', opacity: 0.35,
        }} />

      {/* Content */}
      <div className="relative z-10">
        <Header battleCount={battleCount} />

        {/* Input always visible */}
        <InputSection onBattle={handleBattle} />

        {/* View states */}
        {view === VIEW.WELCOME && <WelcomeScreen />}
        {view === VIEW.LOADING && <LoadingSection />}
        {view === VIEW.RESULTS && battleData && (
          <ResultsSection data={battleData} onNewBattle={handleNewBattle} />
        )}
        {view === VIEW.ERROR && (
          <ErrorBanner message={errorMsg} onRetry={handleNewBattle} />
        )}

        {/* Footer */}
        <footer className="text-center py-6 text-[0.75rem] border-t border-white/5 mt-4"
          style={{ color: 'rgba(203,195,215,0.3)' }}>
          ⚔️ <strong>BattleAI</strong> — Powered by competitive AI analysis
        </footer>
      </div>
    </div>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="max-w-2xl mx-auto px-4 mt-10 animate-fadeUp">
      <div className="rounded-2xl border border-red-500/25 p-8 text-center"
        style={{ background: 'rgba(147,0,10,0.12)' }}>
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-lg font-bold text-red-300 mb-2">Battle Failed</h2>
        <p className="text-sm text-[#cbc3d7] mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-xl font-bold text-white border-none cursor-pointer
            transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #a078ff)',
            boxShadow: '0 4px 20px rgba(138,92,246,0.4)' }}
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}
