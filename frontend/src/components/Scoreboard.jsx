import { useEffect, useState } from 'react';

export default function Scoreboard({ score1, score2, winner }) {
  const [animated1, setAnimated1] = useState(0);
  const [animated2, setAnimated2] = useState(0);

  useEffect(() => {
    let c1 = 0, c2 = 0;
    const step = 0.35;
    const id = setInterval(() => {
      c1 = Math.min(c1 + step, score1);
      c2 = Math.min(c2 + step, score2);
      setAnimated1(Math.round(c1));
      setAnimated2(Math.round(c2));
      if (c1 >= score1 && c2 >= score2) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [score1, score2]);

  return (
    <div className="flex items-center justify-center gap-6 rounded-xl border border-white/7 px-8 py-5 mb-5"
      style={{ background: 'rgba(29,31,43,0.9)' }}>

      {/* AI #1 */}
      <div className="flex-1 max-w-[280px] text-right">
        <p className="text-[0.68rem] font-bold tracking-widest uppercase text-[#cbc3d7] mb-1">AI #1</p>
        <p className={`text-4xl font-black tracking-tight text-cyan-400 ${winner === 1 ? 'drop-shadow-[0_0_12px_#4cd7f6]' : ''}`}>
          {animated1}<span className="text-xl text-cyan-400/60">/10</span>
        </p>
        <div className="h-1.5 bg-[#323440] rounded-full mt-2 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${animated1 * 10}%`,
              background: 'linear-gradient(90deg, #4cd7f6, rgba(76,215,246,0.5))'
            }} />
        </div>
      </div>

      {/* Center trophy */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl animate-trophyPulse">🏆</span>
        <span className="text-[0.65rem] font-bold tracking-widest uppercase text-[#fbbf24] whitespace-nowrap">
          {winner ? `AI #${winner} WINS` : '—'}
        </span>
      </div>

      {/* AI #2 */}
      <div className="flex-1 max-w-[280px] text-left">
        <p className="text-[0.68rem] font-bold tracking-widest uppercase text-[#cbc3d7] mb-1">AI #2</p>
        <p className={`text-4xl font-black tracking-tight text-orange-400 ${winner === 2 ? 'drop-shadow-[0_0_12px_#f97316]' : ''}`}>
          {animated2}<span className="text-xl text-orange-400/60">/10</span>
        </p>
        <div className="h-1.5 bg-[#323440] rounded-full mt-2 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${animated2 * 10}%`,
              background: 'linear-gradient(90deg, rgba(249,115,22,0.5), #f97316)'
            }} />
        </div>
      </div>

    </div>
  );
}
