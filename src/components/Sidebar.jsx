"use client";

const navItems = [
  { id: "overview", label: "Dashboard", icon: "⬡" },
  { id: "users", label: "User Management", icon: "👥", badge: "3" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  { id: "referrals", label: "Referrals & Growth", icon: "🔗" },
  { id: "revenue", label: "Revenue & Fees", icon: "💰" }
];

export default function Sidebar({ activePage, onChange }) {
  return (
    <aside className="fixed left-0 top-0 z-[100] flex min-h-screen w-[var(--sidebar-w)] flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] px-5 pb-4 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-bold text-white shadow-[0_0_16px_var(--primary-glow)]">
            N
          </div>
          <div>
            <div className="text-[15px] font-bold tracking-[-0.3px]">Trading socialhub</div>
            <div className="text-[10px] uppercase tracking-[1.5px] text-[var(--text-muted)]">
              Admin Console
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2.5 py-3">
        <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[1.2px] text-[var(--text-dim)]">
          Main
        </div>
        {navItems.slice(0, 5).map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              className={`relative mb-0.5 flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-left text-[13px] font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-[rgba(99,102,241,0.18)] to-[rgba(99,102,241,0.06)] text-[var(--text)] shadow-[inset_0_0_0_1px_rgba(99,102,241,0.3)]"
                  : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]"
              }`}
              onClick={() => onChange(item.id)}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-r-sm bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />
              )}
              <span className="w-[18px] text-center text-[15px]">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-[var(--red)] px-1.5 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[1.2px] text-[var(--text-dim)]">
          Platform
        </div>
        <button
          className={`relative mb-0.5 flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-left text-[13px] font-medium transition ${
            activePage === "revenue"
              ? "bg-gradient-to-r from-[rgba(99,102,241,0.18)] to-[rgba(99,102,241,0.06)] text-[var(--text)] shadow-[inset_0_0_0_1px_rgba(99,102,241,0.3)]"
              : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]"
          }`}
          onClick={() => onChange("revenue")}
        >
          <span className="w-[18px] text-center text-[15px]">💰</span>
          <span>Revenue & Fees</span>
        </button>

        <div className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[1.2px] text-[var(--text-dim)]">
          System
        </div>
        <div className="mb-0.5 flex items-center gap-2 rounded-[10px] px-3 py-2 text-[13px] font-medium text-[var(--text-muted)]">
          <span className="w-[18px] text-center text-[15px]">🔔</span>
          <span>Notifications</span>
          <span className="ml-auto rounded-full bg-[var(--gold)] px-1.5 text-[10px] font-semibold text-white">
            5
          </span>
        </div>
        <div className="mb-0.5 flex items-center gap-2 rounded-[10px] px-3 py-2 text-[13px] font-medium text-[var(--text-muted)]">
          <span className="w-[18px] text-center text-[15px]">⚙️</span>
          <span>Settings</span>
        </div>
      </nav>

      <div className="border-t border-[var(--border)] p-3.5">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-[var(--border)] bg-white/5 p-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-xs font-bold">
            SA
          </div>
          <div>
            <div className="text-[12px] font-semibold">Super Admin</div>
            <div className="text-[10px] text-[var(--text-muted)]">admin@nexustrade.io</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
