export default function LoadingSection() {
  return (
    <section className="max-w-2xl mx-auto px-4 mt-10 text-center animate-fadeUp">
      <div className="rounded-2xl border border-white/8 p-12"
        style={{ background: 'rgba(29,31,43,0.85)' }}>

        {/* Fighters row */}
        <div className="flex items-center justify-center gap-8 mb-8">

          {/* Fighter 1 */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-5xl animate-bounce-ai">🤖</div>
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-400">
              AI Champion #1
            </span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-dotBlink" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-dotBlink2" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-dotBlink3" />
            </div>
          </div>

          {/* VS orb */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-sm
            text-[#1a005c] animate-spinGlow"
            style={{ background: 'linear-gradient(135deg, #d0bcff, #a078ff)' }}>
            VS
          </div>

          {/* Fighter 2 */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-5xl animate-bounce-ai-2">🤖</div>
            <span className="text-xs font-bold tracking-wider uppercase text-orange-400">
              AI Champion #2
            </span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-dotBlink" />
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-dotBlink2" />
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-dotBlink3" />
            </div>
          </div>

        </div>

        <p className="text-sm text-[#cbc3d7] animate-pulseDot">
          Summoning AI champions to the arena…
        </p>
      </div>
    </section>
  );
}
