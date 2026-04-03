"use client";

import { useEffect, useState } from "react";
import useApi from "../lib/useApi";
import { ENDPOINTS } from "../lib/api";
import { CardSkeleton, ChartSkeleton, TableSkeleton, ErrorCard } from "./Skeletons";

export default function OverviewPage({ notifs, notifLoading, badgeCount, onDismiss, onClear, flashType, onLinkClick }) {
  const [progressReady, setProgressReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setProgressReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  // ── Fetch all overview data from API ──────────────────────────────
  const { data: overview, loading: overviewLoading, error: overviewError, refetch: refetchOverview } =
    useApi(ENDPOINTS.statsOverview);

  const { data: engagement, loading: engagementLoading } =
    useApi(ENDPOINTS.statsEngagement, { period: "30d" });

  const { data: recentUsers, loading: recentLoading } =
    useApi(ENDPOINTS.usersRecent, { limit: 10 });

  const funnelFlashClass = (type) =>
    flashType === type
      ? "-translate-y-1.5 scale-[1.03] shadow-[0_0_20px_rgba(99,102,241,0.4)] ring-2 ring-[var(--primary)]"
      : "";

  // ── Derived data (from API or empty defaults) ─────────────────────
  const statCards = overview?.stat_cards || [];
  const funnel = overview?.funnel || {};
  const socialActivity = overview?.social_activity || [];
  const contentCategories = overview?.content_categories || [];
  const aiInsights = overview?.ai_insights || [];
  const platformHealth = overview?.platform_health || {};
  const users = recentUsers?.users || recentUsers || [];

  const gradients = [
    "from-[#6366F1] to-[#8B5CF6]",
    "from-[#10B981] to-[#3B82F6]",
    "from-[#F59E0B] to-[#EF4444]",
    "from-[#8B5CF6] to-[#EC4899]",
    "from-[#3B82F6] to-[#6366F1]",
  ];

  // ── Fetch referral campaign links ─────────────────────────────────
  const { data: linksData, loading: linksLoading } = useApi(ENDPOINTS.referralLinks);
  const referralLinks = Array.isArray(linksData)
    ? linksData
    : Array.isArray(linksData?.links)
    ? linksData.links
    : [];

  const getAvatar = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "??";

  // ── Bar color map for stat cards ──────────────────────────────────
  const barColorMap = {
    "Total Users": "from-[var(--primary)]",
    "Active Traders": "from-[var(--green)]",
    "Engagement Score": "from-[var(--gold)]",
    "Revenue Generated": "from-[var(--accent)]",
    "Referral Conversions": "from-[var(--blue)]",
  };

  const iconMap = {
    "Total Users": "👥",
    "Active Traders": "📈",
    "Engagement Score": "⚡",
    "Revenue Generated": "💰",
    "Referral Conversions": "🔗",
  };

  if (overviewError) {
    return (
      <div className="animate-fadeUp">
        <ErrorCard message={overviewError.message} onRetry={refetchOverview} />
      </div>
    );
  }

  return (
    <div className="animate-fadeUp">
      {/* ── Referrals & Growth Funnel ──────────────────────────── */}
      <div className="surface-card mb-5 p-5">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xl">🔗</span>
          <div className="text-xl font-bold tracking-[-0.3px]">Referrals & Growth</div>
        </div>
        <div className="mb-5 text-xs text-[var(--text-muted)]">
          Conversion funnel analysis and referral performance
        </div>

        <div className="rounded-[14px] border border-[var(--border)] bg-[var(--surface2)] p-5">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.8px] text-[var(--text-muted)]">
            Conversion Funnel
          </div>
          {overviewLoading ? (
            <ChartSkeleton height="h-24" />
          ) : (
            <div className="flex items-center gap-0">
              <div className="flex-1 rounded-[14px] border-2 border-[rgba(99,102,241,0.6)] bg-[rgba(99,102,241,0.05)] p-5 text-center transition">
                <div className="font-mono text-[28px] font-bold leading-none text-[#818CF8]">
                  {funnel.views ?? "—"}
                </div>
                <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Views</div>
              </div>
              <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
                <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
                <div>↓{funnel.views_to_clicks_drop ?? "—"}</div>
              </div>
              <div
                className={`flex-1 rounded-[14px] border-2 border-[rgba(139,92,246,0.6)] bg-[rgba(139,92,246,0.05)] p-5 text-center transition ${funnelFlashClass("click")}`}
              >
                <div className="font-mono text-[28px] font-bold leading-none text-[#A78BFA]">
                  {funnel.clicks ?? "—"}
                </div>
                <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Clicks</div>
              </div>
              <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
                <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
                <div>↓{funnel.clicks_to_signups_drop ?? "—"}</div>
              </div>
              <div
                className={`flex-1 rounded-[14px] border-2 border-[rgba(245,158,11,0.6)] bg-[rgba(245,158,11,0.05)] p-5 text-center transition ${funnelFlashClass("signup")}`}
              >
                <div className="font-mono text-[28px] font-bold leading-none text-[#FBBF24]">
                  {funnel.signups ?? "—"}
                </div>
                <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Signups</div>
              </div>
              <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
                <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
                <div>↓{funnel.signups_to_active_drop ?? "—"}</div>
              </div>
              <div className="flex-1 rounded-[14px] border-2 border-[rgba(16,185,129,0.6)] bg-[rgba(16,185,129,0.05)] p-5 text-center">
                <div className="font-mono text-[28px] font-bold leading-none text-[#34D399]">
                  {funnel.active_traders ?? "—"}
                </div>
                <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Active Traders</div>
              </div>
              <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
                <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
                <div>↓{funnel.active_to_new_drop ?? "—"}</div>
              </div>
              <div
                className={`flex-1 rounded-[14px] border-2 border-[rgba(59,130,246,0.6)] bg-[rgba(59,130,246,0.05)] p-5 text-center transition ${funnelFlashClass("newtrader")}`}
              >
                <div className="font-mono text-[28px] font-bold leading-none text-[#60A5FA]">
                  {funnel.new_traders ?? "—"}
                </div>
                <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">New Traders</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-5 gap-4">
        {overviewLoading
          ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
          : statCards.map((item) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--border-bright)]"
              >
                <div className="absolute right-4 top-4 text-xl opacity-20">
                  {iconMap[item.label] || "📊"}
                </div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
                  {item.label}
                </div>
                <div className="font-mono text-[26px] font-bold tracking-[-0.5px]">{item.value}</div>
                <div
                  className={`mt-1 text-[11px] font-medium ${
                    item.change?.startsWith("▼") ? "text-[var(--red)]" : "text-[var(--green)]"
                  }`}
                >
                  {item.change}
                </div>
                <div
                  className={`absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r ${
                    barColorMap[item.label] || "from-[var(--primary)]"
                  } to-transparent`}
                />
              </div>
            ))}
      </div>

      {/* ── Engagement Trend + Platform Health ────────────────── */}
      <div className="mb-5 grid grid-cols-[2fr_1fr] gap-4">
        <div className="surface-card">
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              Engagement Trend — 30 Days
            </div>
            <div className="flex gap-2">
              <button className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                Export
              </button>
              <div className="rounded-md border border-[var(--primary)] bg-[rgba(99,102,241,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--primary)]">
                30D
              </div>
            </div>
          </div>
          <div className="px-5 pb-5 pt-4">
            {engagementLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <>
                <div className="mb-3 flex gap-5">
                  <div>
                    <div className="font-mono text-[22px] font-bold">
                      {engagement?.total_interactions ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">Total Interactions</div>
                  </div>
                  <div>
                    <div className="font-mono text-[22px] font-bold text-[var(--green)]">
                      {engagement?.change_pct ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">vs prev. period</div>
                  </div>
                </div>
                <div className="relative h-40">
                  <svg className="h-full w-full" viewBox="0 0 580 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="580" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="75" x2="580" y2="75" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="580" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <path
                      d={engagement?.engagement_path || "M0,120 L580,120"}
                      fill="url(#engGrad)"
                    />
                    <path
                      d={engagement?.engagement_line || "M0,120 L580,120"}
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d={engagement?.revenue_path || "M0,135 L580,135"}
                      fill="url(#revGrad)"
                    />
                    <path
                      d={engagement?.revenue_line || "M0,135 L580,135"}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="4 3"
                    />
                  </svg>
                </div>
                <div className="mt-2 flex gap-4 text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-0.5 w-3 rounded bg-[var(--primary)]" />
                    Engagement
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-0.5 w-3 rounded bg-[var(--green)]" />
                    Revenue
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[rgba(99,102,241,0.2)] bg-gradient-to-br from-[rgba(99,102,241,0.08)] to-[rgba(139,92,246,0.04)] p-5 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Platform Health
          </div>
          {overviewLoading ? (
            <ChartSkeleton height="h-32" />
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div
                  className="relative flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(var(--primary) 0% ${platformHealth.score ?? 87}%, rgba(255,255,255,0.06) ${platformHealth.score ?? 87}%)`,
                  }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-bold">
                    {platformHealth.score ?? "—"}%
                  </div>
                </div>
                <div>
                  <div className="text-[22px] font-bold">{platformHealth.label ?? "—"}</div>
                  <div className="text-[11px] text-[var(--text-muted)]">
                    {platformHealth.status ?? "—"}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--green)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                    {platformHealth.uptime ?? "—"}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {(platformHealth.metrics || []).map((metric) => (
                  <div key={metric.label} className="rounded-lg bg-white/5 p-2.5">
                    <div className={`text-base font-bold ${metric.color || "text-[var(--text)]"}`}>
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)]">{metric.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Social Activity / Content / AI Insights ───────────── */}
      <div className="mb-5 grid grid-cols-3 gap-4">
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Social Activity Today
          </div>
          <div className="px-5 pb-5 pt-3">
            {overviewLoading ? (
              <ChartSkeleton height="h-32" />
            ) : (
              socialActivity.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-b-0"
                >
                  <div className="text-xs text-[var(--text-muted)]">{row.label}</div>
                  <div className={`font-mono text-xs font-semibold ${row.color || "text-[var(--text)]"}`}>
                    {row.value}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Top Content Categories
          </div>
          <div className="px-5 pb-5 pt-3">
            {overviewLoading ? (
              <ChartSkeleton height="h-32" />
            ) : (
              contentCategories.map((item) => (
                <div key={item.label} className="mb-2 last:mb-0">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">{item.label}</span>
                    <span className="font-mono text-[11px]">{item.value}%</span>
                  </div>
                  <div className="h-1 rounded bg-white/10">
                    <div
                      className="h-1 rounded transition-[width] duration-1000"
                      style={{
                        width: progressReady ? `${item.value}%` : "0%",
                        background: item.color || "var(--primary)",
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="surface-card border border-[rgba(99,102,241,0.2)]">
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              🧠 AI Insights
            </div>
            <div className="rounded-full bg-[rgba(99,102,241,0.1)] px-2 py-0.5 text-[10px] font-semibold text-[var(--primary)]">
              LIVE
            </div>
          </div>
          <div className="px-5 pb-5 pt-3">
            {overviewLoading ? (
              <ChartSkeleton height="h-40" />
            ) : (
              aiInsights.map((insight) => (
                <div
                  key={insight.title}
                  className="flex gap-3 border-b border-[var(--border)] py-3 last:border-b-0"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                      insight.bg || "bg-white/5"
                    }`}
                  >
                    {insight.icon}
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${insight.color || "text-[var(--text)]"}`}>
                      {insight.title}
                    </div>
                    <div className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                      {insight.desc}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Live Alerts + Recent Signups ──────────────────────── */}
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="surface-card flex flex-col">
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="flex items-center gap-2">
              <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
                🔔 Live Alerts
              </div>
              <div
                className="min-w-[20px] rounded-full px-2 text-center text-[10px] font-bold text-white transition"
                style={{ background: badgeCount ? "var(--red)" : "var(--text-dim)" }}
              >
                {badgeCount}
              </div>
            </div>
            <button
              className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]"
              onClick={onClear}
            >
              Clear all
            </button>
          </div>
          <div className="flex-1 overflow-hidden px-5 pb-5 pt-3">
            <div className="mb-3">
              <div className="mb-1.5 text-[10px] uppercase tracking-[0.6px] text-[var(--text-muted)]">Quick Links</div>
              {linksLoading ? (
                <div className="flex flex-col gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-7 animate-pulse rounded-lg bg-white/5" />
                  ))}
                </div>
              ) : referralLinks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-white/10 py-3 text-center text-[11px] text-[var(--text-dim)]">
                  No referral links configured
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {referralLinks.map(({ label, url, icon }) => (
                    <button
                      key={label}
                      className="flex w-full items-center gap-2 rounded-lg border border-[rgba(139,92,246,0.15)] bg-[rgba(139,92,246,0.06)] px-3 py-1.5 text-left text-[11px] font-medium text-[var(--text-muted)] transition hover:border-[rgba(139,92,246,0.4)] hover:bg-[rgba(139,92,246,0.12)] hover:text-[var(--text)]"
                      onClick={() => onLinkClick?.(url, label)}
                      title={`Open: ${url}`}
                    >
                      {icon && <span>{icon}</span>}
                      <span className="flex-1 truncate">{label}</span>
                      <span className="shrink-0 text-[9px] text-[var(--text-dim)]">↗</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex max-h-[260px] flex-col gap-1 overflow-y-auto">
              {notifLoading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="h-10 animate-pulse rounded-lg bg-white/5 mb-1" />
                ))
              ) : notifs.length === 0 ? (
                <div className="py-6 text-center text-[12px] text-[var(--text-dim)]">
                  <div className="mb-1 text-2xl">🎉</div>
                  All caught up! No new alerts.
                </div>
              ) : (
                notifs.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-start gap-2 rounded-lg border-b border-[var(--border)] px-1.5 py-2 text-xs last:border-b-0"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full" style={{ background: notif.color }} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[var(--text-muted)]">
                        <strong className="text-[var(--text)]">{notif.title}</strong> — {notif.msg}
                      </div>
                      <div className="text-[10px] text-[var(--text-dim)]">{notif.time}</div>
                    </div>
                    <button
                      className="text-sm text-[var(--text-dim)]"
                      onClick={() => onDismiss(notif.id)}
                      aria-label="Dismiss"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="surface-card">
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              Recent Signups
            </div>
            <button className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
              View all users →
            </button>
          </div>
          <div className="px-5 pb-5 pt-3">
            {recentLoading ? (
              <TableSkeleton cols={6} rows={4} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                      <th className="border-b border-[var(--border)] px-3 py-2">User</th>
                      <th className="border-b border-[var(--border)] px-3 py-2">Role</th>
                      <th className="border-b border-[var(--border)] px-3 py-2">Status</th>
                      <th className="border-b border-[var(--border)] px-3 py-2">KYC</th>
                      <th className="border-b border-[var(--border)] px-3 py-2">Joined</th>
                      <th className="border-b border-[var(--border)] px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {users.map((row, idx) => (
                      <tr
                        key={row.id || row.email || idx}
                        className="border-b border-[var(--border)] last:border-b-0"
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${
                                gradients[idx % gradients.length]
                              } text-[11px] font-bold`}
                            >
                              {getAvatar(row.name)}
                            </div>
                            <div>
                              <div className="text-[12px] font-semibold">{row.name}</div>
                              <div className="text-[10px] text-[var(--text-muted)]">{row.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="rounded-full border border-[rgba(99,102,241,0.2)] bg-[rgba(99,102,241,0.12)] px-2 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
                            {row.role}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`rounded-full border border-white/10 px-2 py-0.5 text-[11px] font-semibold ${
                              row.status === "active" || row.status === "Active"
                                ? "bg-[rgba(16,185,129,0.12)] text-[var(--green)]"
                                : row.status === "pending" || row.status === "Pending"
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
                              row.kyc_status === "verified" || row.kyc_status === "Verified"
                                ? "bg-[rgba(16,185,129,0.1)] text-[var(--green)]"
                                : "bg-[rgba(245,158,11,0.1)] text-[var(--gold)]"
                            }`}
                          >
                            {row.kyc_status === "verified" || row.kyc_status === "Verified"
                              ? "✓ Verified"
                              : "⏳ Pending"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-[11px] text-[var(--text-muted)]">
                          {row.joined || row.created_at || "—"}
                        </td>
                        <td className="px-3 py-3">
                          <button
                            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                              row.status === "suspended" || row.status === "Suspended"
                                ? "border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] text-[var(--red)]"
                                : "bg-white/5 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]"
                            }`}
                          >
                            {row.status === "suspended" || row.status === "Suspended" ? "Review" : "View"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-xs text-[var(--text-muted)]">
                          No recent signups.
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
    </div>
  );
}
