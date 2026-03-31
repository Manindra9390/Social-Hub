"use client";

export default function ReferralsPage() {
  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        🔗 Referrals & Growth
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Conversion Funnel — This Month
          </div>
          <div className="px-5 pb-5 pt-3">
            {[
              { label: "👁️ Views", value: "1,284,930", pct: "100%", width: "100%", color: "var(--primary)" },
              { label: "🔗 Clicks", value: "873,752", pct: "68%", width: "68%", color: "var(--blue)", drop: "▼32%" },
              { label: "📝 Signups", value: "359,780", pct: "28%", width: "28%", color: "var(--green)", drop: "▼40%" },
              { label: "✅ Verified", value: "231,287", pct: "18%", width: "18%", color: "var(--gold)", drop: "▼10%" },
              { label: "📈 Active", value: "102,794", pct: "8%", width: "8%", color: "var(--accent)", drop: "▼10%" }
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3 border-b border-[var(--border)] py-3 last:border-b-0">
                <div className="w-24 text-xs font-medium text-[var(--text-muted)]">{row.label}</div>
                <div className="flex-1">
                  <div
                    className="flex h-7 items-center rounded-md px-2 text-xs font-bold"
                    style={{ width: row.width, background: `${row.color}33`, color: row.color }}
                  >
                    {row.pct}
                  </div>
                </div>
                <div className="w-20 text-right font-mono text-xs font-semibold" style={{ color: row.color }}>
                  {row.value}
                  {row.drop && <span className="ml-1 text-[10px] text-[var(--red)]">{row.drop}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Referrals", value: "48,291", change: "▲ 14.2% MoM", tone: "text-[var(--green)]" },
              { label: "Conversion Rate", value: "8.3%", change: "▲ 0.8% pts", tone: "text-[var(--green)]" }
            ].map((item) => (
              <div key={item.label} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
                  {item.label}
                </div>
                <div className="font-mono text-[22px] font-bold">{item.value}</div>
                <div className={`text-[11px] font-medium ${item.tone}`}>{item.change}</div>
              </div>
            ))}
          </div>

          <div className="surface-card flex-1">
            <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              🚨 Fraud Flags
            </div>
            <div className="px-5 pb-5 pt-3">
              <div className="rounded-lg border border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.07)] p-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-[var(--red)]">⚠️ Suspicious Referrals Detected</div>
                  <span className="rounded-full border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] px-2 py-0.5 text-[10px] font-semibold text-[var(--red)]">
                    7 cases
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                  Accounts showing self-referral loops and bot-like signup patterns
                </div>
                <button className="mt-2 rounded-md border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] px-2.5 py-1 text-[11px] font-semibold text-[var(--red)]">
                  Review Cases →
                </button>
              </div>
              {[
                { label: "Flagged Accounts", value: "7", tone: "text-[var(--red)]" },
                { label: "Under Investigation", value: "3", tone: "text-[var(--gold)]" },
                { label: "Cleared This Month", value: "22", tone: "text-[var(--green)]" }
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-b-0">
                  <div className="text-xs text-[var(--text-muted)]">{row.label}</div>
                  <div className={`font-mono text-xs font-semibold ${row.tone}`}>{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="surface-card">
        <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
          Top Referrers
        </div>
        <div className="px-5 pb-5 pt-3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                <tr>
                  {[
                    "Rank",
                    "User",
                    "Total Refs",
                    "Converted",
                    "Conv. Rate",
                    "Earnings",
                    "Status"
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
                    rank: 1,
                    user: "DeepWave",
                    refs: "1,820",
                    converted: "1,092",
                    rate: "60.0%",
                    earnings: "$9,841",
                    avatar: "DW",
                    gradient: "from-[#F59E0B] to-[#F97316]"
                  },
                  {
                    rank: 2,
                    user: "CryptoKing",
                    refs: "1,204",
                    converted: "843",
                    rate: "70.0%",
                    earnings: "$7,220",
                    avatar: "CK",
                    gradient: "from-[#6366F1] to-[#8B5CF6]"
                  },
                  {
                    rank: 3,
                    user: "SigmaX",
                    refs: "984",
                    converted: "511",
                    rate: "51.9%",
                    earnings: "$4,882",
                    avatar: "SX",
                    gradient: "from-[#EC4899] to-[#EF4444]"
                  }
                ].map((row) => (
                  <tr key={row.user} className="border-b border-[var(--border)] last:border-b-0">
                    <td className="px-3 py-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(245,158,11,0.2)] text-[10px] font-bold text-[#F59E0B]">
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${row.gradient} text-[11px] font-bold`}
                        >
                          {row.avatar}
                        </div>
                        <div className="text-[12px] font-semibold">{row.user}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-mono text-[12px] font-semibold">{row.refs}</td>
                    <td className="px-3 py-3 font-mono text-[12px]">{row.converted}</td>
                    <td className="px-3 py-3 font-mono text-[12px] font-bold text-[var(--green)]">
                      {row.rate}
                    </td>
                    <td className="px-3 py-3 font-mono text-[12px] font-bold text-[var(--gold)]">
                      {row.earnings}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.12)] px-2 py-0.5 text-[11px] font-semibold text-[var(--green)]">
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                        Active
                      </span>
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
