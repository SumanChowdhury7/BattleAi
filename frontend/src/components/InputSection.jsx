import { useState, useRef } from 'react';

const SUGGESTIONS = [
  { emoji: '🏏', label: 'Who is the king of cricket?', q: 'Who is the king of cricket?' },
  { emoji: '💻', label: 'Best programming language?', q: 'What is the best programming language?' },
  { emoji: '⚛️', label: 'React vs Vue for beginners?', q: 'Is React or Vue better for beginners?' },
  { emoji: '🌌', label: 'Explain quantum computing', q: 'Explain quantum computing simply' },
];

export default function InputSection({ onBattle }) {
  const [value, setValue] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef(null);

  function handleBattle() {
    if (!value.trim()) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      inputRef.current?.focus();
      return;
    }
    onBattle(value.trim());
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleBattle();
  }

  function handleSuggestion(q) {
    setValue(q);
    onBattle(q);
  }

  return (
    <section className="max-w-3xl mx-auto px-4 mt-8">
      {/* Card */}
      <div className="rounded-2xl border border-white/10 p-6 transition-shadow duration-300
        focus-within:shadow-[0_0_60px_rgba(138,92,246,0.15),0_0_0_2px_rgba(208,188,255,0.14)]"
        style={{ background: 'rgba(29,31,43,0.9)' }}>

        <p className="text-[0.7rem] font-bold tracking-widest uppercase text-[#cbc3d7] mb-4">
          ⚡ Enter your question to start a battle
        </p>

        {/* Input row */}
        <div className="flex gap-3 items-center">
          <div className={`flex-1 flex items-center gap-3 rounded-xl border border-white/10 px-4
            bg-[#191b26] transition-all duration-200 focus-within:border-[rgba(208,188,255,0.4)]
            focus-within:shadow-[0_0_20px_rgba(138,92,246,0.12)] ${shaking ? 'animate-shake' : ''}`}>
            <span className="text-lg">🤔</span>
            <input
              ref={inputRef}
              id="question-input"
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything… Who is the king of cricket?"
              className="flex-1 bg-transparent border-none outline-none text-[#e1e1f2]
                placeholder:text-[rgba(203,195,215,0.4)] font-normal text-base py-3.5
                caret-[#d0bcff]"
              aria-label="Your question for the AI battle"
            />
          </div>
          <button
            id="battle-btn"
            onClick={handleBattle}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white
              cursor-pointer border-none transition-all duration-200
              hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110
              active:scale-95 whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #a078ff)',
              boxShadow: '0 4px 20px rgba(138,92,246,0.45)'
            }}
          >
            <span>⚡</span> Battle!
          </button>
        </div>

        {/* Hint */}
        <p className="mt-3 text-[0.75rem] text-[rgba(203,195,215,0.38)]">
          Press{' '}
          <kbd className="bg-[#323440] border border-white/15 rounded px-1.5 py-0.5 text-[0.7rem]
            text-[#d0bcff] font-mono">Enter</kbd>
          {' '}or click Battle! to see two AI solutions and a judge's recommendation
        </p>
      </div>

      {/* Suggestion chips */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {SUGGESTIONS.map(s => (
          <button
            key={s.q}
            onClick={() => handleSuggestion(s.q)}
            className="px-4 py-2 rounded-full text-sm border border-white/12 text-[#e1e1f2]
              cursor-pointer transition-all duration-200
              hover:border-[rgba(208,188,255,0.35)] hover:-translate-y-0.5
              hover:shadow-[0_4px_16px_rgba(138,62,248,0.2)]"
            style={{ background: 'rgba(39,41,53,0.8)' }}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>
    </section>
  );
}
