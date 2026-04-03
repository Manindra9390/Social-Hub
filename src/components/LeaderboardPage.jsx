"use client";

import { useState } from "react";
import useApi from "../lib/useApi";
import { ENDPOINTS } from "../lib/api";
import { CardSkeleton, TableSkeleton, ChartSkeleton, ErrorCard } from "./Skeletons";

const filters = ["All-Time", "Monthly", "Weekly", "Daily"];

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState("All-Time");
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");

  const queryParams = { filter: activeFilter.toLowerCase() };
  if (roleFilter) queryParams.role = roleFilter;
  if (search) queryParams.search = search;

  const { data, loading, error, refetch } = useApi(
    ENDPOINTS.leaderboard,
    queryParams,
    [activeFilter, roleFilter, search]
  );

  const podium = data?.podium || [];
  const rows = data?.rows || data?.leaderboard || [];

  const gradients = [
    "from-[#F59E0B] to-[#F97316]",
    "from-[#9CA3AF] to-[#6B7280]",
    "from-[#CD7F32] to-[#92400E]",
    "from-[#3B82F6] to-[#6366F1]",
    "from-[#EC4899] to-[#8B5CF6]",
  ];

  const medalColors = [
    "bg-[rgba(245,158,11,0.2)] text-[#F59E0B]",
    "bg-[rgba(156,163,175,0.2)] text-[#9CA3AF]",
    "bg-[rgba(180,120,60,0.2)] text-[#CD7F32]",
    "bg-white/5 text-[var(--text-muted)]",
  ];

  const podiumCards = [
    { medal: "🥈", card: "bg-[rgba(156,163,175,0.07)] border-[rgba(156,163,175,0.15)]", roiColor: "text-[#9CA3AF]" },
    { medal: "🥇", card: "bg-[rgba(245,158,11,0.07)] border-[rgba(245,158,11,0.2)]", roiColor: "text-[#F59E0B]", highlight: true },
    { medal: "🥉", card: "bg-[rgba(180,120,60,0.07)] border-[rgba(180,120,60,0.15)]", roiColor: "text-[#CD7F32]" },
  ];

  const getAvatar = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "??";

  if (error) {
    return (
      <div className="animate-fadeUp">
        <ErrorCard message={error.message} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        🏆 Leaderboard
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* ── Podium ────────────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : podium.map((item, idx) => {
              const style = podiumCards[idx] || podiumCards[0];
              return (
                <div
                  key={item.name || idx}
                  className={`rounded-[var(--radius-sm)] border p-4 text-center transition hover:-translate-y-1 ${style.card} ${style.highlight ? "scale-[1.04]" : ""}`}
                >
                  <div className="mb-2 text-[22px]">{style.medal}</div>
                  <div
                    className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${gradients[idx % gradients.length]} text-base font-bold`}
                  >
                    {getAvatar(item.name)}
                  </div>
                  <div className="text-[13px] font-semibold">{item.name}</div>
                  <div className={`font-mono text-[18px] font-bold ${style.roiColor}`}>
                    {item.roi}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">{item.meta}</div>
                  <div className="mt-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-[var(--text)]">
                      {item.badge}
                    </span>
                  </div>
                </div>
              );
            })}
      </div>

      {/* ── Filters ───────────────────────────────────────────── */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-3 py-1 text-[12px] font-medium transition ${
                activeFilter === filter
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-bright)] hover:text-[var(--text)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <select
            className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-[12px] text-[var(--text)] outline-none"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="trader">Traders</option>
            <option value="partner">Partners</option>
            <option value="customer">Customers</option>
          </select>
          <div className="flex h-8 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3">
            <span className="text-[12px] text-[var(--text-muted)]">🔍</span>
            <input
              className="w-32 bg-transparent text-[12px] text-[var(--text)] outline-none"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Leaderboard Table ─────────────────────────────────── */}
      <div className="surface-card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-5">
              <TableSkeleton cols={9} rows={5} />
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                <tr>
                  {["Rank", "User", "Role", "ROI %", "Engagement", "Referrals", "Badge", "30D Trend", "Action"].map(
                    (header) => (
                      <th key={header} className="border-b border-[var(--border)] px-3 py-2">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {rows.map((row, idx) => (
                  <tr key={row.user || row.name || idx} className="border-b border-[var(--border)] last:border-b-0">
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                          medalColors[Math.min(idx, medalColors.length - 1)]
                        }`}
                      >
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
                        <div>
                          <div className="text-[12px] font-semibold">{row.user || row.name}</div>
                          <div className="text-[10px] text-[var(--text-muted)]">{row.email || ""}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full border border-[rgba(99,102,241,0.2)] bg-[rgba(99,102,241,0.12)] px-2 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
                        {row.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-[12px] font-bold text-[var(--green)]">
                      {row.roi}
                    </td>
                    <td className="px-3 py-3 text-[12px] font-semibold">{row.engagement}</td>
                    <td className="px-3 py-3 font-mono text-[12px]">{row.referrals || row.refs}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          row.badge_class || "bg-white/5 text-[var(--text)]"
                        }`}
                      >
                        {row.badge}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <svg width="60" height="24" viewBox="0 0 60 24">
                        <path
                          d={row.trend_path || "M0,20 C10,18 30,12 60,6"}
                          fill="none"
                          stroke="var(--green)"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </td>
                    <td className="px-3 py-3">
                      <button className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-sm text-[var(--text-muted)]">
                      No leaderboard data yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
