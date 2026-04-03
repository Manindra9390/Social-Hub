"use client";

import useApi from "../lib/useApi";
import { ENDPOINTS } from "../lib/api";
import { CardSkeleton, ChartSkeleton, ErrorCard } from "./Skeletons";

export default function AnalyticsPage() {
  const { data: summary, loading: summaryLoading, error: summaryError, refetch: refetchSummary } =
    useApi(ENDPOINTS.analyticsSummary);

  const { data: sessions, loading: sessionsLoading } =
    useApi(ENDPOINTS.analyticsSessions, { period: "30d" });

  const { data: traffic, loading: trafficLoading } =
    useApi(ENDPOINTS.analyticsTraffic);

  const { data: devices, loading: devicesLoading } =
    useApi(ENDPOINTS.analyticsDevices);

  const { data: retention, loading: retentionLoading } =
    useApi(ENDPOINTS.analyticsRetention);

  const { data: growth, loading: growthLoading } =
    useApi(ENDPOINTS.analyticsGrowth, { months: 12 });

  const { data: peakHours, loading: peakLoading } =
    useApi(ENDPOINTS.analyticsPeakHours);

  const statCards = summary?.stat_cards || [];
  const trafficSources = traffic?.sources || [];
  const deviceBreakdown = devices?.devices || [];
  const growthBars = growth?.bars || [];
  const growthMonths = growth?.months || [];
  const heatmapCells = peakHours?.cells || [];
  const peakLabelsTop = peakHours?.time_labels || [];
  const peakLabelsBottom = peakHours?.day_labels || [];
  const peakSummary = peakHours?.peak_summary || "";

  if (summaryError) {
    return (
      <div className="animate-fadeUp">
        <ErrorCard message={summaryError.message} onRetry={refetchSummary} />
      </div>
    );
  }

  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        📈 Analytics
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* ── Stat Cards ────────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-5 gap-4">
        {summaryLoading
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

      {/* ── Sessions Trend + Traffic Sources ───────────────────── */}
      <div className="mb-5 grid grid-cols-[2fr_1fr] gap-4">
        <div className="surface-card">
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              Sessions Trend — 30 Days
            </div>
            <div className="rounded-md border border-[var(--primary)] bg-[rgba(99,102,241,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--primary)]">
              30D
            </div>
          </div>
          <div className="px-5 pb-5 pt-3">
            {sessionsLoading ? (
              <ChartSkeleton height="h-52" />
            ) : (
              <>
                <div className="mb-3 flex gap-4">
                  <div>
                    <div className="font-mono text-[22px] font-bold">
                      {sessions?.total_sessions ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">Total Sessions</div>
                  </div>
                  <div>
                    <div className="font-mono text-[22px] font-bold text-[var(--green)]">
                      {sessions?.change_pct ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">vs prev. period</div>
                  </div>
                </div>
                <div className="relative h-[160px]">
                  <svg className="h-full w-full" viewBox="0 0 580 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sessionsArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="580" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="580" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="130" x2="580" y2="130" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <path
                      d={sessions?.area_path || "M0,160 L580,160"}
                      fill="url(#sessionsArea)"
                    />
                    <path
                      d={sessions?.line_path || "M0,160 L580,160"}
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Traffic Sources
          </div>
          <div className="px-5 pb-5 pt-3">
            {trafficLoading ? (
              <ChartSkeleton height="h-52" />
            ) : (
              <>
                <div className="mx-auto flex h-[160px] w-[160px] items-center justify-center">
                  <svg viewBox="0 0 120 120" className="h-full w-full">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="14" />
                    {trafficSources.map((src, idx) => (
                      <circle
                        key={src.label}
                        cx="60"
                        cy="60"
                        r="46"
                        fill="none"
                        stroke={src.stroke_color || "#6366F1"}
                        strokeWidth="14"
                        strokeDasharray={src.dash_array || "0 289"}
                        strokeDashoffset={src.dash_offset || 0}
                      />
                    ))}
                    <circle cx="60" cy="60" r="32" fill="var(--surface)" />
                    <text x="60" y="62" textAnchor="middle" fontSize="12" fill="var(--text)">
                      100%
                    </text>
                  </svg>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  {trafficSources.map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: row.color || "var(--primary)" }}
                        />
                        {row.label}
                      </div>
                      <div className="font-mono text-[11px] text-[var(--text)]">{row.value}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Engagement + Devices + Retention ───────────────────── */}
      <div className="mb-5 grid grid-cols-[2fr_1fr_1fr] gap-4">
        <div className="surface-card">
          <div className="flex items-center justify-between px-5 pt-4">
            <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              Engagement Trend — 30 Days
            </div>
            <div className="rounded-md border border-[var(--primary)] bg-[rgba(99,102,241,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--primary)]">
              30D
            </div>
          </div>
          <div className="px-5 pb-5 pt-3">
            {sessionsLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <>
                <div className="mb-3 flex gap-4">
                  <div>
                    <div className="font-mono text-[22px] font-bold">
                      {sessions?.engagement_total ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">Total Sessions</div>
                  </div>
                  <div>
                    <div className="font-mono text-[22px] font-bold text-[var(--green)]">
                      {sessions?.engagement_change ?? "—"}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">vs prev. period</div>
                  </div>
                </div>
                <div className="relative h-[150px]">
                  <svg className="h-full w-full" viewBox="0 0 580 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="engGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="580" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="75" x2="580" y2="75" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="580" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <path
                      d={sessions?.engagement_area || "M0,150 L580,150"}
                      fill="url(#engGradAnalytics)"
                    />
                    <path
                      d={sessions?.engagement_line || "M0,150 L580,150"}
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Sessions by Device
          </div>
          <div className="px-5 pb-5 pt-3">
            {devicesLoading ? (
              <ChartSkeleton height="h-32" />
            ) : (
              deviceBreakdown.map((row) => (
                <div key={row.label} className="mb-3 last:mb-0">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">{row.label}</span>
                    <span className="font-mono text-[11px]">{row.value}%</span>
                  </div>
                  <div className="h-2 rounded bg-white/10">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${row.value}%`,
                        background: row.color || "var(--primary)",
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Retention Curve
          </div>
          <div className="px-5 pb-5 pt-3">
            {retentionLoading ? (
              <ChartSkeleton height="h-40" />
            ) : (
              <>
                <div className="mb-2 text-[11px] text-[var(--text-muted)]">
                  {retention?.label || "Day 1 → Day 30"}
                </div>
                <div className="relative h-[120px]">
                  <svg className="h-full w-full" viewBox="0 0 200 120" preserveAspectRatio="none">
                    <path
                      d={retention?.curve_line || "M0,20 C100,60 200,95 200,95"}
                      fill="none"
                      stroke="var(--green)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d={retention?.curve_area || "M0,20 C100,60 200,95 200,95 L200,120 L0,120 Z"}
                      fill="rgba(16,185,129,0.12)"
                    />
                  </svg>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span>{retention?.start_label || "Day 1: 100%"}</span>
                  <span className="text-[var(--green)]">
                    {retention?.end_label || "Day 30: —%"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── User Growth + Peak Hours ──────────────────────────── */}
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            User Growth — 12 Months
          </div>
          <div className="px-5 pb-5 pt-3">
            {growthLoading ? (
              <ChartSkeleton height="h-64" />
            ) : (
              <>
                <div className="flex h-[120px] items-end gap-2">
                  {growthBars.map((height, idx) => (
                    <div key={idx} className="flex-1 text-center">
                      <div
                        className={`mx-auto w-full rounded-t-md ${
                          idx === growthBars.length - 1
                            ? "bg-gradient-to-b from-[var(--accent)] to-[var(--primary)] shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                            : "bg-[rgba(99,102,241,0.35)]"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className={`mt-1 text-[9px] ${
                          idx === growthBars.length - 1
                            ? "font-bold text-[var(--primary)]"
                            : "text-[var(--text-dim)]"
                        }`}
                      >
                        {growthMonths[idx] || ""}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <svg className="h-[120px] w-full" viewBox="0 0 580 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="growthLine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="580" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="70" x2="580" y2="70" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="0" y1="110" x2="580" y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <path
                      d={growth?.area_path || "M0,120 L580,120"}
                      fill="url(#growthLine)"
                    />
                    <path
                      d={growth?.line_path || "M0,120 L580,120"}
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Peak Activity Hours
          </div>
          <div className="px-5 pb-5 pt-3">
            {peakLoading ? (
              <ChartSkeleton height="h-40" />
            ) : (
              <>
                <div className="grid grid-cols-6 gap-1 text-[9px] text-[var(--text-dim)]">
                  {peakLabelsTop.map((label) => (
                    <div key={label} className="text-center">
                      {label}
                    </div>
                  ))}
                  {heatmapCells.map((intensity, idx) => (
                    <div
                      key={idx}
                      className="h-5 rounded"
                      style={{
                        background: `rgba(99,102,241,${intensity})`,
                        boxShadow: intensity > 0.7 ? "0 0 8px rgba(99,102,241,0.35)" : "none",
                      }}
                    />
                  ))}
                  {peakLabelsBottom.map((label) => (
                    <div key={label} className="text-[9px] text-[var(--text-dim)]">
                      {label}
                    </div>
                  ))}
                  {/* fill remaining grid cells */}
                  {Array.from({ length: Math.max(0, 6 - peakLabelsBottom.length) }).map((_, i) => (
                    <div key={`filler-${i}`} />
                  ))}
                </div>
                {peakSummary && (
                  <div
                    className="mt-3 text-[11px] text-[var(--text-muted)]"
                    dangerouslySetInnerHTML={{ __html: peakSummary }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
