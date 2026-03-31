"use client";

export default function UsersPage() {
  return (
    <div className="animate-fadeUp">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[16px] font-semibold">
          👥 User Management
          <div className="h-px w-24 bg-[var(--border)]" />
        </div>
        <button className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-[12px] font-semibold text-white">
          + Add User
        </button>
      </div>

      <div className="mb-5 grid grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "142,830", change: "▲ 8.4%", color: "text-[var(--green)]" },
          { label: "Active", value: "128,441", change: "▲ 3.1%", color: "text-[var(--green)]" },
          { label: "KYC Pending", value: "1,240", change: "▼ Queue up", color: "text-[var(--red)]" },
          { label: "Suspended", value: "214", change: "▲ 4 this week", color: "text-[var(--red)]" }
        ].map((item) => (
          <div key={item.label} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className={`text-[11px] font-semibold uppercase tracking-[0.5px] ${item.label === "Suspended" ? "text-[var(--red)]" : "text-[var(--text-muted)]"}`}>
              {item.label}
            </div>
            <div className={`font-mono text-[22px] font-bold ${item.label === "Suspended" ? "text-[var(--red)]" : ""}`}>
              {item.value}
            </div>
            <div className={`text-[11px] font-medium ${item.color}`}>{item.change}</div>
          </div>
        ))}
      </div>

      <div className="surface-card">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4">
          <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">All Users</div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3">
              <span className="text-[12px] text-[var(--text-muted)]">🔍</span>
              <input className="w-40 bg-transparent text-[12px] text-[var(--text)] outline-none" placeholder="Search name or email..." />
            </div>
            <select className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-[12px] text-[var(--text)] outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
            <select className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-[12px] text-[var(--text)] outline-none">
              <option>All Roles</option>
              <option>Trader</option>
              <option>Partner</option>
              <option>Customer</option>
            </select>
          </div>
        </div>

        <div className="px-5 pb-5 pt-3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                <tr>
                  {[
                    "User",
                    "Email",
                    "Location",
                    "Role",
                    "Status",
                    "KYC",
                    "Joined",
                    "Actions"
                  ].map((header) => (
                    <th key={header} className="border-b border-[var(--border)] px-3 py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {[
                  {
                    name: "Arjun Kumar",
                    email: "arjun@nexustrade.io",
                    location: "🇮🇳 Mumbai",
                    role: "Trader",
                    status: "Active",
                    kyc: "Verified",
                    joined: "Mar 28, 2025",
                    avatar: "AK",
                    gradient: "from-[#6366F1] to-[#8B5CF6]"
                  },
                  {
                    name: "Sarah Park",
                    email: "sarah@nexustrade.io",
                    location: "🇰🇷 Seoul",
                    role: "Partner",
                    status: "Active",
                    kyc: "Verified",
                    joined: "Jan 15, 2025",
                    avatar: "SP",
                    gradient: "from-[#10B981] to-[#3B82F6]"
                  },
                  {
                    name: "Marco Rossi",
                    email: "marco@nexustrade.io",
                    location: "🇮🇹 Milan",
                    role: "Customer",
                    status: "Pending",
                    kyc: "Pending",
                    joined: "Mar 29, 2025",
                    avatar: "MR",
                    gradient: "from-[#F59E0B] to-[#EF4444]"
                  },
                  {
                    name: "Zhao Hui",
                    email: "zhao@nexustrade.io",
                    location: "🇨🇳 Shanghai",
                    role: "Trader",
                    status: "Suspended",
                    kyc: "Verified",
                    joined: "Nov 4, 2024",
                    avatar: "ZH",
                    gradient: "from-[#EF4444] to-[#F97316]"
                  },
                  {
                    name: "NanoQuant",
                    email: "nano@nexustrade.io",
                    location: "🇺🇸 New York",
                    role: "Trader",
                    status: "Active",
                    kyc: "Verified",
                    joined: "Dec 20, 2024",
                    avatar: "NQ",
                    gradient: "from-[#8B5CF6] to-[#EC4899]"
                  }
                ].map((row) => (
                  <tr key={row.email} className="border-b border-[var(--border)] last:border-b-0">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${row.gradient} text-[11px] font-bold`}
                        >
                          {row.avatar}
                        </div>
                        <div className="text-[12px] font-semibold">{row.name}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-[12px] text-[var(--text-muted)]">{row.email}</td>
                    <td className="px-3 py-3 text-[12px] text-[var(--text-muted)]">{row.location}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full border border-[rgba(99,102,241,0.2)] bg-[rgba(99,102,241,0.12)] px-2 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
                        {row.role}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full border border-white/10 px-2 py-0.5 text-[11px] font-semibold ${
                          row.status === "Active"
                            ? "bg-[rgba(16,185,129,0.12)] text-[var(--green)]"
                            : row.status === "Pending"
                            ? "bg-[rgba(245,158,11,0.1)] text-[var(--gold)]"
                            : "bg-[rgba(239,68,68,0.1)] text-[var(--red)]"
                        }`}
                      >
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          row.kyc === "Verified"
                            ? "bg-[rgba(16,185,129,0.1)] text-[var(--green)]"
                            : "bg-[rgba(245,158,11,0.1)] text-[var(--gold)]"
                        }`}
                      >
                        {row.kyc === "Verified" ? "✓ Verified" : "⏳ Pending"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[11px] text-[var(--text-dim)]">{row.joined}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <button className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                          View
                        </button>
                        <button className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                          Suspend
                        </button>
                        <button className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                          Role ▾
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
