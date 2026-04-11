export default function WelcomeScreen() {
  return (
    <section className="max-w-2xl mx-auto px-4 mt-14 mb-10 text-center animate-fadeUp">

      {/* Floating avatars */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl
          animate-float border border-cyan-400/25 shadow-[0_0_30px_rgba(76,215,246,0.2)]"
          style={{ background: 'rgba(76,215,246,0.12)' }}>
          🤖
        </div>
        <span className="text-3xl font-black tracking-tight gradient-text">VS</span>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl
          animate-float-delayed border border-orange-400/25 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
          style={{ background: 'rgba(249,115,22,0.12)' }}>
          🤖
        </div>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-[#e1e1f2] mb-4">
        Welcome to the <span className="gradient-text">AI Battle Arena</span>
      </h1>

      <p className="text-[1.05rem] text-[#cbc3d7] leading-relaxed max-w-lg mx-auto">
        Ask any question and two AI champions will compete to give you the best answer.
        A judge will evaluate both solutions and declare a winner.
      </p>

      {/* Feature chips */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {[
          { icon: '🤖', label: 'Two AI Models' },
          { icon: '⚖️', label: "Judge's Verdict" },
          { icon: '📊', label: 'Scored Responses' },
          { icon: '👑', label: 'Winner Declared' },
        ].map(f => (
          <div key={f.label}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-[#cbc3d7]"
            style={{ background: 'rgba(39,41,53,0.7)' }}>
            <span>{f.icon}</span> {f.label}
          </div>
        ))}
      </div>

    </section>
  );
}
