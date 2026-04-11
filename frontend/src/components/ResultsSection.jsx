import Scoreboard from './Scoreboard.jsx';
import ChampionCard from './ChampionCard.jsx';
import JudgeCard from './JudgeCard.jsx';

export default function ResultsSection({ data, onNewBattle }) {
  const { problem, solution_1, solution_2, judge } = data;
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const winner = solution_1_score >= solution_2_score ? 1 : 2;

  return (
    <section className="max-w-[1700px] mx-auto px-4 mt-6 mb-12 animate-fadeUp">

      {/* Question banner */}
      <div className="flex items-center gap-3 rounded-xl border border-white/12 px-5 py-3.5 mb-5"
        style={{ background: 'linear-gradient(135deg, rgba(138,92,246,0.18), rgba(76,215,246,0.08))' }}>
        <span className="text-2xl flex-shrink-0">❓</span>
        <p className="flex-1 text-base font-semibold text-[#e1e1f2] tracking-tight">{problem}</p>
        <button
          id="new-battle-btn"
          onClick={onNewBattle}
          className="whitespace-nowrap text-xs font-semibold text-[#d0bcff] px-4 py-2 rounded-full
            border border-white/15 cursor-pointer transition-all duration-200
            hover:border-[rgba(208,188,255,0.4)] hover:-translate-y-0.5"
          style={{ background: 'rgba(50,52,64,0.9)' }}
        >
          🔄 New Battle
        </button>
      </div>

      {/* Scoreboard */}
      <Scoreboard score1={solution_1_score} score2={solution_2_score} winner={winner} />

      {/* 3-column battle arena */}
      <div className="grid gap-4"
        style={{ gridTemplateColumns: '1fr 320px 1fr' }}>

        {/* AI Champion 1 */}
        <ChampionCard
          champion={1}
          solution={solution_1}
          score={solution_1_score}
          isWinner={winner === 1}
          delay="0.05s"
        />

        {/* Center: VS + Judge */}
        <div className="flex flex-col gap-4" style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
          {/* VS Badge */}
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center
            font-black text-[#1a005c] text-sm animate-glowPulse"
            style={{ background: 'linear-gradient(135deg, #d0bcff, #a078ff)' }}>
            VS
          </div>

          {/* Judge Card */}
          <JudgeCard
            score1={solution_1_score}
            score2={solution_2_score}
            winner={winner}
            reasoning1={solution_1_reasoning}
            reasoning2={solution_2_reasoning}
          />
        </div>

        {/* AI Champion 2 */}
        <ChampionCard
          champion={2}
          solution={solution_2}
          score={solution_2_score}
          isWinner={winner === 2}
          delay="0.15s"
        />

      </div>
    </section>
  );
}
