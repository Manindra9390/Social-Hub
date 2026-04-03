"use client";

import useApi from "../lib/useApi";
import { ENDPOINTS } from "../lib/api";
import { CardSkeleton, TableSkeleton, ChartSkeleton, ErrorCard } from "./Skeletons";

export default function RevenuePage() {
  const { data: stats, loading: statsLoading, error: statsError, refetch: refetchStats } =
    useApi(ENDPOINTS.revenueStats);

  const { data: mrr, loading: mrrLoading } =
    useApi(ENDPOINTS.revenueMrr, { months: 8 });

  const { data: breakdown, loading: breakdownLoading } =
    useApi(ENDPOINTS.revenueBreakdown);

  const { data: topUsers, loading: topUsersLoading, error: topError, refetch: refetchTop } =
    useApi(ENDPOINTS.revenueTopUsers);

  const statCards = stats?.cards || [];
  const mrrData = mrr || {};
  const mrrBars = mrrData.bars || [];
  const mrrMonths = mrrData.months || [];
  const breakdownRows = breakdown?.rows || [];
  const topEarners = topUsers?.users || topUsers || [];

  const gradients = [
    "from-[#F59E0B] to-[#F97316]",
    "from-[#9CA3AF] to-[#6B7280]",
    "from-[#3B82F6] to-[#6366F1]",
    "from-[#EC4899] to-[#8B5CF6]",
    "from-[#10B981] to-[#3B82F6]",
  ];

  const getAvatar = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "??";

  if (statsError) {
    return (
      <div className="animate-fadeUp">
        <ErrorCard message={statsError.message} onRetry={refetchStats} />
      </div>
    );
  }

  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        💰 Revenue & Fees
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* ── Stat Cards ────────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-5 gap-4">
        {statsLoading
          ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
          : statCards.map((item) => (
              <div
                key={item.label}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
                  {item.label}
                </div>
                <div className="font-mono text-[22px] font-bold">{item.value}</div>
                <div className="text-[11px] font-medium text-[var(--green)]">{item.change}</div>
              </div>
            ))}
      </div>

      {/* ── MRR Chart + Revenue Breakdown ─────────────────────── */}
      <div className="mb-5 grid grid-cols-[2fr_1fr] gap-4">
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Monthly Recurring Revenue
          </div>
          <div className="px-5 pb-5 pt-3">
            {mrrLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <>
                <div className="mb-4 flex gap-5">
                  <div>
                    <div className="font-mono text-[28px] font-bold text-[var(--gold)]">
                      {mrrData.current ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">This Month</div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-[14px] font-bold text-[var(--green)]">
                      {mrrData.change ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">vs last month</div>
                  </div>
                </div>
                <div className="flex h-[100px] items-end gap-2">
                  {mrrBars.map((height, idx) => (
                    <div key={idx} className="flex-1 text-center">
                      <div
                        className={`mx-auto w-full rounded-t-md ${
                          idx === mrrBars.length - 1
                            ? "bg-gradient-to-b from-[#F59E0B] to-[rgba(245,158,11,0.6)] shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                            : "bg-[rgba(245,158,11,0.4)]"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className={`mt-1 text-[9px] ${
                          idx === mrrBars.length - 1
                            ? "font-bold text-[var(--gold)]"
                            : "text-[var(--text-dim)]"
                        }`}
                      >
                        {mrrMonths[idx] || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Revenue Breakdown
          </div>
          <div className="px-5 pb-5 pt-3">
            {breakdownLoading ? (
              <ChartSkeleton height="h-32" />
            ) : (
              breakdownRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-b-0"
                >
                  <div className="text-xs text-[var(--text-muted)]">{row.label}</div>
                  <div
                    className={`font-mono text-xs font-semibold ${row.color || "text-[var(--text)]"}`}
                  >
                    {row.value}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Top Earning Users ─────────────────────────────────── */}
      <div className="surface-card">
        <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
          Top Earning Users
        </div>
        <div className="px-5 pb-5 pt-3">
          {topUsersLoading ? (
            <TableSkeleton cols={6} rows={3} />
          ) : topError ? (
            <ErrorCard message={topError.message} onRetry={refetchTop} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                  <tr>
                    {["User", "Total Trades", "Fees Paid", "Commissions Earned", "Net P&L", "Tier"].map(
                      (header) => (
                        <th key={header} className="border-b border-[var(--border)] px-3 py-2">
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {topEarners.map((row, idx) => (
                    <tr
                      key={row.user || row.name || idx}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${
                              gradients[idx % gradients.length]
                            } text-[11px] font-bold`}
                          >
                            {getAvatar(row.user || row.name)}
                          </div>
                          <div className="text-[12px] font-semibold">{row.user || row.name}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono text-[12px]">{row.trades}</td>
                      <td className="px-3 py-3 font-mono text-[12px] text-[var(--red)]">{row.fees}</td>
                      <td className="px-3 py-3 font-mono text-[12px] text-[var(--green)]">
                        {row.commissions}
                      </td>
                      <td className="px-3 py-3 font-mono text-[12px] font-bold text-[var(--green)]">
                        {row.pnl}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            row.tier_class || "bg-white/5 text-[var(--text)]"
                          }`}
                        >
                          {row.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {topEarners.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-[var(--text-muted)]">
                        No revenue data yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
