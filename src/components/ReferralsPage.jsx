"use client";

import useApi from "../lib/useApi";
import { ENDPOINTS } from "../lib/api";
import { CardSkeleton, TableSkeleton, ChartSkeleton, ErrorCard } from "./Skeletons";

export default function ReferralsPage() {
  const { data: funnel, loading: funnelLoading } =
    useApi(ENDPOINTS.referralsFunnel);

  const { data: stats, loading: statsLoading } =
    useApi(ENDPOINTS.referralsStats);

  const { data: flags, loading: flagsLoading } =
    useApi(ENDPOINTS.referralsFlags);

  const { data: topData, loading: topLoading, error: topError, refetch: refetchTop } =
    useApi(ENDPOINTS.referralsTop);

  const funnelSteps = funnel?.steps || [];
  const statCards = stats?.cards || [];
  const flagSummary = flags?.summary || {};
  const flagRows = flags?.rows || [];
  const topReferrers = topData?.referrers || topData || [];

  const gradients = [
    "from-[#F59E0B] to-[#F97316]",
    "from-[#6366F1] to-[#8B5CF6]",
    "from-[#EC4899] to-[#EF4444]",
    "from-[#10B981] to-[#3B82F6]",
    "from-[#8B5CF6] to-[#EC4899]",
  ];

  const getAvatar = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "??";

  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        🔗 Referrals & Growth
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* ── Funnel + Stats + Fraud ─────────────────────────────── */}
      <div className="mb-5 grid grid-cols-2 gap-4">
        {/* Funnel */}
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Conversion Funnel — This Month
          </div>
          <div className="px-5 pb-5 pt-3">
            {funnelLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              funnelSteps.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 border-b border-[var(--border)] py-3 last:border-b-0"
                >
                  <div className="w-24 text-xs font-medium text-[var(--text-muted)]">{row.label}</div>
                  <div className="flex-1">
                    <div
                      className="flex h-7 items-center rounded-md px-2 text-xs font-bold"
                      style={{
                        width: row.width || `${row.pct_num || 0}%`,
                        background: `${row.color || "var(--primary)"}33`,
                        color: row.color || "var(--primary)",
                      }}
                    >
                      {row.pct}
                    </div>
                  </div>
                  <div
                    className="w-20 text-right font-mono text-xs font-semibold"
                    style={{ color: row.color || "var(--primary)" }}
                  >
                    {row.value}
                    {row.drop && (
                      <span className="ml-1 text-[10px] text-[var(--red)]">{row.drop}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats + Fraud Flags */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {statsLoading
              ? Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)
              : statCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
                      {item.label}
                    </div>
                    <div className="font-mono text-[22px] font-bold">{item.value}</div>
                    <div
                      className={`text-[11px] font-medium ${
                        item.change?.startsWith("▼") ? "text-[var(--red)]" : "text-[var(--green)]"
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                ))}
          </div>

          <div className="surface-card flex-1">
            <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              🚨 Fraud Flags
            </div>
            <div className="px-5 pb-5 pt-3">
              {flagsLoading ? (
                <ChartSkeleton height="h-32" />
              ) : (
                <>
                  <div className="rounded-lg border border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.07)] p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-[var(--red)]">
                        {flagSummary.title || "⚠️ Suspicious Referrals Detected"}
                      </div>
                      <span className="rounded-full border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] px-2 py-0.5 text-[10px] font-semibold text-[var(--red)]">
                        {flagSummary.count || 0} cases
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                      {flagSummary.description || "—"}
                    </div>
                    <button className="mt-2 rounded-md border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] px-2.5 py-1 text-[11px] font-semibold text-[var(--red)]">
                      Review Cases →
                    </button>
                  </div>
                  {flagRows.map((row) => (
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
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Top Referrers ─────────────────────────────────────── */}
      <div className="surface-card">
        <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
          Top Referrers
        </div>
        <div className="px-5 pb-5 pt-3">
          {topLoading ? (
            <TableSkeleton cols={7} rows={3} />
          ) : topError ? (
            <ErrorCard message={topError.message} onRetry={refetchTop} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                  <tr>
                    {["Rank", "User", "Total Refs", "Converted", "Conv. Rate", "Earnings", "Status"].map(
                      (header) => (
                        <th key={header} className="border-b border-[var(--border)] px-3 py-2">
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {topReferrers.map((row, idx) => (
                    <tr
                      key={row.user || row.name || idx}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <td className="px-3 py-3">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(245,158,11,0.2)] text-[10px] font-bold text-[#F59E0B]">
                          {row.rank || idx + 1}
                        </span>
                      </td>
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
                      <td className="px-3 py-3 font-mono text-[12px] font-semibold">
                        {row.total_refs || row.refs}
                      </td>
                      <td className="px-3 py-3 font-mono text-[12px]">{row.converted}</td>
                      <td className="px-3 py-3 font-mono text-[12px] font-bold text-[var(--green)]">
                        {row.conversion_rate || row.rate}
                      </td>
                      <td className="px-3 py-3 font-mono text-[12px] font-bold text-[var(--gold)]">
                        {row.earnings}
                      </td>
                      <td className="px-3 py-3">
                        <span className="rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.12)] px-2 py-0.5 text-[11px] font-semibold text-[var(--green)]">
                          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                          {row.status || "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {topReferrers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-sm text-[var(--text-muted)]">
                        No referral data yet.
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
