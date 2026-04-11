export default function Header({ battleCount }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07]"
      style={{ background: 'rgba(12,14,24,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="max-w-[1700px] mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">⚔️</span>
          <span className="text-[1.35rem] font-black tracking-[-0.04em] gradient-text">BattleAI</span>
          <span className="text-[0.58rem] font-bold tracking-wider px-1.5 py-0.5 rounded
            bg-[#a078ff] text-[#1a005c]">BETA</span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-[#cbc3d7] font-light hidden sm:block">
          Two AIs. One Judge.{' '}
          <span className="text-[#d0bcff] font-semibold">You Decide.</span>
        </p>

        {/* Stats */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10"
          style={{ background: 'rgba(39,41,53,0.8)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#4cd7f6] animate-pulseDot" />
          <span className="text-xs font-semibold text-[#cbc3d7]">
            <span className="text-white">{battleCount}</span> Battles
          </span>
        </div>

      </div>
    </header>
  );
}
