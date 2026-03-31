"use client";

export default function RevenuePage() {
  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        💰 Revenue & Fees
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="mb-5 grid grid-cols-5 gap-4">
        {[
          { label: "Total Revenue", value: "$2.84M", change: "▲ 18.7% MoM" },
          { label: "Fees Collected", value: "$482K", change: "▲ 11.2%" },
          { label: "MRR", value: "$284K", change: "▲ 8.4%" },
          { label: "Commissions", value: "$128K", change: "▲ 6.1%" },
          { label: "Avg Rev/User", value: "$19.88", change: "▲ $1.24" }
        ].map((item) => (
          <div key={item.label} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              {item.label}
            </div>
            <div className="font-mono text-[22px] font-bold">{item.value}</div>
            <div className="text-[11px] font-medium text-[var(--green)]">{item.change}</div>
          </div>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-[2fr_1fr] gap-4">
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Monthly Recurring Revenue
          </div>
          <div className="px-5 pb-5 pt-3">
            <div className="mb-4 flex gap-5">
              <div>
                <div className="font-mono text-[28px] font-bold text-[var(--gold)]">$284K</div>
                <div className="text-[11px] text-[var(--text-muted)]">This Month</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[14px] font-bold text-[var(--green)]">+$22K</div>
                <div className="text-[11px] text-[var(--text-muted)]">vs last month</div>
              </div>
            </div>
            <div className="flex h-[100px] items-end gap-2">
              {[55, 62, 70, 78, 82, 86, 90, 100].map((height, idx) => (
                <div key={height} className="flex-1 text-center">
                  <div
                    className={`mx-auto w-full rounded-t-md ${
                      idx === 7
                        ? "bg-gradient-to-b from-[#F59E0B] to-[rgba(245,158,11,0.6)] shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                        : "bg-[rgba(245,158,11,0.4)]"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div className={`mt-1 text-[9px] ${idx === 7 ? "text-[var(--gold)] font-bold" : "text-[var(--text-dim)]"}`}>
                    {[
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                      "Jan",
                      "Feb",
                      "Mar"
                    ][idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Revenue Breakdown
          </div>
          <div className="px-5 pb-5 pt-3">
            {[
              { label: "Trading Fees", value: "$1.42M", color: "text-[var(--gold)]" },
              { label: "Subscription Plans", value: "$682K", color: "text-[var(--primary)]" },
              { label: "Referral Program", value: "$428K", color: "text-[var(--green)]" },
              { label: "Premium Features", value: "$216K", color: "text-[var(--accent)]" },
              { label: "Ad Placements", value: "$112K", color: "text-[var(--text)]" }
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-b-0">
                <div className="text-xs text-[var(--text-muted)]">{row.label}</div>
                <div className={`font-mono text-xs font-semibold ${row.color}`}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-card">
        <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
          Top Earning Users
        </div>
        <div className="px-5 pb-5 pt-3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                <tr>
                  {[
                    "User",
                    "Total Trades",
                    "Fees Paid",
                    "Commissions Earned",
                    "Net P&L",
                    "Tier"
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
                    user: "CryptoKing",
                    trades: "2,841",
                    fees: "$12,482",
                    commissions: "$48,200",
                    pnl: "+$182K",
                    tier: "⭐ Elite",
                    avatar: "CK",
                    gradient: "from-[#F59E0B] to-[#F97316]",
                    tierClass: "bg-[rgba(245,158,11,0.1)] text-[var(--gold)]"
                  },
                  {
                    user: "BitMaster_Pro",
                    trades: "1,920",
                    fees: "$8,841",
                    commissions: "$22,100",
                    pnl: "+$124K",
                    tier: "💎 Pro",
                    avatar: "BM",
                    gradient: "from-[#9CA3AF] to-[#6B7280]",
                    tierClass: "bg-[rgba(99,102,241,0.1)] text-[var(--primary)]"
                  },
                  {
                    user: "DeepWave",
                    trades: "1,284",
                    fees: "$5,921",
                    commissions: "$9,841",
                    pnl: "+$88K",
                    tier: "🌟 Expert",
                    avatar: "DW",
                    gradient: "from-[#3B82F6] to-[#6366F1]",
                    tierClass: "bg-[rgba(139,92,246,0.1)] text-[var(--accent)]"
                  }
                ].map((row) => (
                  <tr key={row.user} className="border-b border-[var(--border)] last:border-b-0">
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
                    <td className="px-3 py-3 font-mono text-[12px]">{row.trades}</td>
                    <td className="px-3 py-3 font-mono text-[12px] text-[var(--red)]">{row.fees}</td>
                    <td className="px-3 py-3 font-mono text-[12px] text-[var(--green)]">{row.commissions}</td>
                    <td className="px-3 py-3 font-mono text-[12px] font-bold text-[var(--green)]">{row.pnl}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.tierClass}`}>
                        {row.tier}
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
