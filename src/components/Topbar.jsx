"use client";

export default function Topbar({ title, bellPulse, notifCount, adminInitials, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-[90] flex h-[60px] items-center gap-4 border-b border-[var(--border)] bg-[color:var(--bg)]/80 px-6 backdrop-blur-[20px]">
      <div className="text-[16px] font-semibold">{title}</div>
      <div className="flex h-9 w-full max-w-[360px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 transition focus-within:border-[var(--primary)]">
        <span className="text-sm text-[var(--text-muted)]">🔍</span>
        <input
          type="text"
          placeholder="Search users, trades, reports..."
          className="w-full bg-transparent text-[13px] text-[var(--text)] outline-none"
        />
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <div className="flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.1)] px-3 py-1 text-[11px] font-semibold text-[var(--green)]">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulseGreen" />
          LIVE
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[15px] text-[var(--text-muted)] transition hover:border-[var(--border-bright)] hover:text-[var(--text)]">
          📊
        </button>
        <button
          className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[15px] text-[var(--text-muted)] transition hover:border-[var(--border-bright)] hover:text-[var(--text)] ${
            bellPulse ? "scale-110" : "scale-100"
          }`}
        >
          🔔
          {/* Red dot only shown when there are live notifications */}
          {notifCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-[var(--bg)] bg-[var(--red)] animate-pulseSoft" />
          )}
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[18px] text-[var(--text-muted)] transition hover:border-[var(--border-bright)] hover:text-[var(--text)]">
          ⚙️
        </button>
        <button
          className="relative flex h-9 items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 text-[12px] font-semibold text-[var(--text-muted)] transition hover:border-[var(--border-bright)] hover:text-[var(--text)]"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          <span>{theme === "light" ? "🌞" : "🌙"}</span>
          <span className="hidden sm:inline">{theme === "light" ? "Light" : "Dark"}</span>
        </button>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[rgba(99,102,241,0.4)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-xs font-bold">
          {adminInitials || "SA"}
        </div>
      </div>
    </header>
  );
}
