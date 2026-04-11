export default function JudgeCard({ score1, score2, winner, reasoning1, reasoning2 }) {
  return (
    <div className="rounded-2xl overflow-hidden animate-slideCard glass border"
      style={{
        borderColor: 'rgba(251,191,36,0.22)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 40px rgba(251,191,36,0.08)',
        animationDelay: '0.1s'
      }}>

      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.14), rgba(249,115,22,0.08))',
          borderColor: 'rgba(251,191,36,0.18)'
        }}>
        <span className="text-xl">⚖️</span>
        <span className="text-sm font-extrabold tracking-wide text-[#fbbf24]">Judge's Verdict</span>
      </div>

      {/* Scores */}
      <div className="px-5 py-4 flex flex-col gap-2.5">
        {/* AI #1 score row */}
        <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all
          ${winner === 1 ? 'border border-[rgba(251,191,36,0.3)]' : 'hover:bg-white/[0.03]'}`}
          style={winner === 1 ? { background: 'rgba(251,191,36,0.08)' } : {}}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#4cd7f6]" />
            <span className={`text-sm font-semibold ${winner === 1 ? 'text-[#fbbf24]' : 'text-[#cbc3d7]'}`}>
              AI #1
            </span>
          </div>
          <span className={`text-xl font-black tracking-tight ${winner === 1 ? 'text-[#fbbf24]' : 'text-cyan-400'}`}>
            {score1}/10
          </span>
        </div>

        {/* AI #2 score row */}
        <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all
          ${winner === 2 ? 'border border-[rgba(251,191,36,0.3)]' : 'hover:bg-white/[0.03]'}`}
          style={winner === 2 ? { background: 'rgba(251,191,36,0.08)' } : {}}>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_6px_#f97316]" />
            <span className={`text-sm font-semibold ${winner === 2 ? 'text-[#fbbf24]' : 'text-[#cbc3d7]'}`}>
              AI #2
            </span>
          </div>
          <span className={`text-xl font-black tracking-tight ${winner === 2 ? 'text-[#fbbf24]' : 'text-orange-400'}`}>
            {score2}/10
          </span>
        </div>
      </div>

      {/* Winner banner */}
      <div className="mx-5 mb-4 flex items-center gap-3 px-4 py-3 rounded-xl border"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(249,115,22,0.08))',
          borderColor: 'rgba(251,191,36,0.28)'
        }}>
        <span className="text-2xl">👑</span>
        <p className="text-sm font-bold text-[#fbbf24]">
          Winner:&nbsp;
          <span className="text-[#e1e1f2]">AI Champion #{winner}</span>
        </p>
      </div>

      {/* Reasoning */}
      <div className="px-5 pb-5 flex flex-col gap-3">

        <ReasoningBlock color="cyan" label="AI #1 Reasoning" text={reasoning1} />
        <ReasoningBlock color="orange" label="AI #2 Reasoning" text={reasoning2} />

      </div>
    </div>
  );
}

function ReasoningBlock({ color, label, text }) {
  const dotClass = color === 'cyan'
    ? 'bg-cyan-400 shadow-[0_0_6px_#4cd7f6]'
    : 'bg-orange-400 shadow-[0_0_6px_#f97316]';

  return (
    <div className="rounded-xl px-4 py-3.5" style={{ background: 'rgba(39,41,53,0.9)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`} />
        <span className="text-[0.67rem] font-bold tracking-[0.06em] uppercase text-[#cbc3d7]">
          {label}
        </span>
      </div>
      <p className="text-[0.78rem] text-[#cbc3d7] leading-relaxed">{text}</p>
    </div>
  );
}
