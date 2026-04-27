import { renderMarkdown } from '../markdown.js';

export default function ChampionCard({ champion, solution, score, isWinner, delay = '0s' }) {
  const isBlue = champion === 1;

  const glowColor = isBlue ? 'rgba(76,215,246,0.22)' : 'rgba(249,115,22,0.22)';
  const borderColor = isBlue
    ? isWinner ? 'rgba(251,191,36,0.45)' : 'rgba(76,215,246,0.22)'
    : isWinner ? 'rgba(251,191,36,0.45)' : 'rgba(249,115,22,0.22)';
  const bgGradient = isBlue
    ? 'linear-gradient(160deg, rgba(76,215,246,0.07), rgba(29,31,43,0.9) 50%)'
    : 'linear-gradient(160deg, rgba(249,115,22,0.07), rgba(29,31,43,0.9) 50%)';
  const scoreColor = isBlue ? 'text-cyan-400' : 'text-orange-400';
  const scoreBg = isBlue ? 'rgba(76,215,246,0.12)' : 'rgba(249,115,22,0.12)';
  const avatarBg = isBlue
    ? { background: 'rgba(76,215,246,0.14)', border: '1px solid rgba(76,215,246,0.3)', boxShadow: '0 0 20px rgba(76,215,246,0.25)' }
    : { background: 'rgba(249,115,22,0.14)', border: '1px solid rgba(249,115,22,0.3)', boxShadow: '0 0 20px rgba(249,115,22,0.25)' };
  const tagBg = isBlue ? 'rgba(76,215,246,0.14)' : 'rgba(249,115,22,0.14)';
  const tagColor = isBlue ? 'text-cyan-400' : 'text-orange-400';

  const boxShadow = isWinner
    ? `0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(251,191,36,0.18), 0 0 0 2px rgba(251,191,36,0.3)`
    : `0 8px 40px rgba(0,0,0,0.4), 0 0 40px ${glowColor}`;

  return (
    <div
      className="rounded-2xl overflow-hidden animate-slideCard transition-transform duration-300 hover:-translate-y-1"
      style={{ border: `1px solid ${borderColor}`, background: bgGradient, boxShadow, animationDelay: delay }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-4"
        style={{ background: 'rgba(50,52,64,0.9)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
            style={avatarBg}>
            🤖
          </div>
          <div>
            <p className="text-[0.95rem] font-bold text-[#e1e1f2] tracking-tight">
              AI Champion <span className="text-[#d0bcff]">#{champion}</span>
            </p>
            <p className="text-xs text-[#cbc3d7] mt-0.5">
              Solution {champion === 1 ? 'Alpha' : 'Beta'}
            </p>
          </div>
        </div>
        {/* Score badge */}
        <div className={`px-3.5 py-1.5 rounded-xl font-black text-xl tracking-tight ${scoreColor}`}
          style={{ background: scoreBg }}>
          {isWinner ? '👑 ' : ''}{score}/10
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Body */}
      <div className="px-5 py-5 max-h-[58vh] scrollable solution-content">
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(solution) }}
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex justify-end"
        style={{ background: 'rgba(50,52,64,0.7)' }}>
        <span className={`text-[0.65rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full ${tagColor}`}
          style={{ background: tagBg }}>
          SOLUTION {champion === 1 ? 'A' : 'B'}
        </span>
      </div>
    </div>
  );
}
