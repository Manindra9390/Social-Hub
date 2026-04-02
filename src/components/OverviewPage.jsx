"use client";

import { useEffect, useState } from "react";

export default function OverviewPage({ notifs, badgeCount, onTrigger, onDismiss, onClear, flashType }) {
  const [progressReady, setProgressReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setProgressReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  const funnelFlashClass = (type) =>
    flashType === type
      ? "-translate-y-1.5 scale-[1.03] shadow-[0_0_20px_rgba(99,102,241,0.4)] ring-2 ring-[var(--primary)]"
      : "";

  const engagementData = [3.0, 3.2, 3.35, 3.5, 3.6, 3.75, 3.9, 4.0, 4.05, 4.08, 4.12, 4.2];
  const revenueData = [1.4, 1.55, 1.6, 1.72, 1.82, 1.95, 2.05, 2.15, 2.22, 2.28, 2.35, 2.42];
  const chartLabels = [
    "Mar 1",
    "Mar 4",
    "Mar 7",
    "Mar 10",
    "Mar 13",
    "Mar 16",
    "Mar 19",
    "Mar 22",
    "Mar 25",
    "Mar 27",
    "Mar 29",
    "Mar 31"
  ];
  const chartWidth = 580;
  const chartHeight = 150;
  const paddingY = 12;
  const maxValue = Math.max(...engagementData, ...revenueData);
  const minValue = Math.min(...engagementData, ...revenueData);
  const range = maxValue - minValue || 1;

  const buildPoints = (data) =>
    data.map((value, index) => {
      const x = (chartWidth / (data.length - 1)) * index;
      const y = chartHeight - ((value - minValue) / range) * (chartHeight - paddingY * 2) - paddingY;
      return [x, y];
    });

  const buildPath = (points) =>
    points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

  const engagementPoints = buildPoints(engagementData);
  const revenuePoints = buildPoints(revenueData);
  const engagementLine = buildPath(engagementPoints);
  const revenueLine = buildPath(revenuePoints);
  const engagementArea = `M 0 ${chartHeight} L ${engagementPoints
    .map(([x, y]) => `${x} ${y}`)
    .join(" L ")} L ${chartWidth} ${chartHeight} Z`;
  const revenueArea = `M 0 ${chartHeight} L ${revenuePoints
    .map(([x, y]) => `${x} ${y}`)
    .join(" L ")} L ${chartWidth} ${chartHeight} Z`;

  const formatMillions = (value) => `${value.toFixed(2)}M`;

  const defaultEngagement = 4.2;
  const defaultChange = 18.4;
  const activeEngagement = activeIndex !== null ? engagementData[activeIndex] : defaultEngagement;
  const activeChange =
    activeIndex !== null && activeIndex > 0
      ? ((engagementData[activeIndex] - engagementData[activeIndex - 1]) / engagementData[activeIndex - 1]) * 100
      : defaultChange;
  const changeText = `${activeChange >= 0 ? "+" : "-"}${Math.abs(activeChange).toFixed(1)}%`;

  const handleChartMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = "touches" in event ? event.touches[0] : event;
    if (!point) return;
    const x = Math.min(Math.max(point.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(point.clientY - rect.top, 0), rect.height);
    const index = Math.round((x / rect.width) * (engagementData.length - 1));
    const pointerY = (y / rect.height) * chartHeight;
    const engagementY = engagementPoints[index][1];
    const distance = Math.abs(pointerY - engagementY);

    if (distance <= 14) {
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };

  return (
    <div className="animate-fadeUp">
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
          <div className="flex items-center gap-0">
            <div className="flex-1 rounded-[14px] border-2 border-[rgba(99,102,241,0.6)] bg-[rgba(99,102,241,0.05)] p-5 text-center transition">
              <div className="font-mono text-[28px] font-bold leading-none text-[#818CF8]">125.0K</div>
              <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Views</div>
            </div>
            <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
              <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
            </div>
            <button
              className={`flex-1 rounded-[14px] border-2 border-[rgba(139,92,246,0.6)] bg-[rgba(139,92,246,0.05)] p-5 text-center transition ${funnelFlashClass(
                "click"
              )}`}
              onClick={() => onTrigger("click")}
              title="Click to fire notification"
            >
              <div className="font-mono text-[28px] font-bold leading-none text-[#A78BFA]">48.0K</div>
              <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Clicks</div>
              <div className="mt-1 text-[9px] text-[rgba(167,139,250,0.6)]">click to notify</div>
            </button>
            <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
              <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
            </div>
            <button
              className={`flex-1 rounded-[14px] border-2 border-[rgba(245,158,11,0.6)] bg-[rgba(245,158,11,0.05)] p-5 text-center transition ${funnelFlashClass(
                "signup"
              )}`}
              onClick={() => onTrigger("signup")}
              title="Click to fire notification"
            >
              <div className="font-mono text-[28px] font-bold leading-none text-[#FBBF24]">18.5K</div>
              <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Signups</div>
              <div className="mt-1 text-[9px] text-[rgba(251,191,36,0.6)]">click to notify</div>
            </button>
            <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
              <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
            </div>
            <div className="flex-1 rounded-[14px] border-2 border-[rgba(16,185,129,0.6)] bg-[rgba(16,185,129,0.05)] p-5 text-center">
              <div className="font-mono text-[28px] font-bold leading-none text-[#34D399]">6.2K</div>
              <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">Active Traders</div>
            </div>
            <div className="flex flex-col items-center px-2 text-[10px] font-bold text-[rgba(239,68,68,0.85)]">
              <div className="text-base text-[rgba(239,68,68,0.8)]">→</div>
            </div>
            <button
              className={`flex-1 rounded-[14px] border-2 border-[rgba(59,130,246,0.6)] bg-[rgba(59,130,246,0.05)] p-5 text-center transition ${funnelFlashClass(
                "newtrader"
              )}`}
              onClick={() => onTrigger("newtrader")}
              title="Click to fire notification"
            >
              <div className="font-mono text-[28px] font-bold leading-none text-[#60A5FA]">4.5K</div>
              <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">New Traders</div>
              <div className="mt-1 text-[9px] text-[rgba(96,165,250,0.6)]">click to notify</div>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-5 gap-4">
        {[
          {
            label: "Total Users",
            value: "142,830",
            change: "▲ 8.4% vs last month",
            color: "text-[var(--green)]",
            icon: "👥",
            bar: "from-[var(--primary)]"
          },
          {
            label: "Active Traders",
            value: "38,291",
            change: "▲ 12.1% this week",
            color: "text-[var(--green)]",
            icon: "📈",
            bar: "from-[var(--green)]"
          },
          {
            label: "Engagement Score",
            value: "94.2",
            change: "▲ 2.3 pts",
            color: "text-[var(--green)]",
            icon: "⚡",
            bar: "from-[var(--gold)]"
          },
          {
            label: "Revenue Generated",
            value: "$2.84M",
            change: "▲ 18.7% MoM",
            color: "text-[var(--green)]",
            icon: "💰",
            bar: "from-[var(--accent)]"
          },
          {
            label: "Referral Conversions",
            value: "6,448",
            change: "▼ 1.2% this week",
            color: "text-[var(--red)]",
            icon: "🔗",
            bar: "from-[var(--blue)]"
          }
        ].map((item) => (
          <div
            key={item.label}
            className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--border-bright)]"
          >
            <div className="absolute right-4 top-4 text-xl opacity-20">{item.icon}</div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              {item.label}
            </div>
            <div className="font-mono text-[26px] font-bold tracking-[-0.5px]">{item.value}</div>
            <div className={`mt-1 text-[11px] font-medium ${item.color}`}>{item.change}</div>
            <div className={`absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r ${item.bar} to-transparent`} />
          </div>
        ))}
      </div>

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
            <div className="mb-3 flex gap-5">
              <div>
                <div className="font-mono text-[22px] font-bold">{formatMillions(activeEngagement)}</div>
                <div className="text-[11px] text-[var(--text-muted)]">Total Interactions</div>
              </div>
              <div>
                <div
                  className={`font-mono text-[22px] font-bold ${
                    activeChange >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"
                  }`}
                >
                  {changeText}
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">vs prev. period</div>
              </div>
            </div>
            <div
              className="relative h-40"
              onMouseMove={handleChartMove}
              onMouseLeave={() => setActiveIndex(null)}
              onTouchStart={handleChartMove}
              onTouchMove={handleChartMove}
              onClick={handleChartMove}
            >
              <svg className="h-full w-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
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
                <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="75" x2={chartWidth} y2="75" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="120" x2={chartWidth} y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <path d={engagementArea} fill="url(#engGrad)" />
                <path d={engagementLine} fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                <path d={revenueArea} fill="url(#revGrad)" />
                <path
                  d={revenueLine}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 3"
                />
                {activeIndex !== null && (
                  <g>
                    <line
                      x1={engagementPoints[activeIndex][0]}
                      y1="0"
                      x2={engagementPoints[activeIndex][0]}
                      y2={chartHeight}
                      stroke="rgba(148,163,184,0.35)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={engagementPoints[activeIndex][0]}
                      cy={engagementPoints[activeIndex][1]}
                      r="6"
                      fill="rgba(99,102,241,0.2)"
                    />
                    <circle
                      cx={engagementPoints[activeIndex][0]}
                      cy={engagementPoints[activeIndex][1]}
                      r="3.5"
                      fill="#6366F1"
                    />
                    <circle
                      cx={revenuePoints[activeIndex][0]}
                      cy={revenuePoints[activeIndex][1]}
                      r="3.5"
                      fill="#10B981"
                    />
                  </g>
                )}
              </svg>
              {activeIndex !== null && (
                <div
                  className="pointer-events-none absolute top-2"
                  style={{ left: `${(engagementPoints[activeIndex][0] / chartWidth) * 100}%` }}
                >
                  <div className="-translate-x-1/2 rounded-lg border border-white/10 bg-[var(--surface)] px-3 py-2 text-[11px] shadow-lg">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                      {chartLabels[activeIndex]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-[var(--text-muted)]">Total Interactions</span>
                      <span className="ml-auto font-mono text-[var(--text)]">
                        {formatMillions(engagementData[activeIndex])}
                      </span>
                    </div>
                    <div className="ml-4 text-[10px] text-[var(--text-muted)]">{changeText} vs prev. period</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--green)]" />
                      <span className="text-[var(--text-muted)]">Revenue</span>
                      <span className="ml-auto font-mono text-[var(--text)]">
                        {formatMillions(revenueData[activeIndex])}
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[rgba(99,102,241,0.2)] bg-gradient-to-br from-[rgba(99,102,241,0.08)] to-[rgba(139,92,246,0.04)] p-5 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <div className="mb-3 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Platform Health
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[conic-gradient(var(--primary)_0%_87%,rgba(255,255,255,0.06)_87%)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-bold">
                87%
              </div>
            </div>
            <div>
              <div className="text-[22px] font-bold">Excellent</div>
              <div className="text-[11px] text-[var(--text-muted)]">All systems operational</div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--green)]">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                99.98% Uptime
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { label: "Churn Rate", value: "2.1%", color: "text-[var(--green)]" },
              { label: "Growth MoM", value: "+8.4%", color: "text-[var(--primary)]" },
              { label: "User Rating", value: "4.8★", color: "text-[var(--gold)]" },
              { label: "API Latency", value: "18ms", color: "text-[var(--text)]" }
            ].map((metric) => (
              <div key={metric.label} className="rounded-lg bg-white/5 p-2.5">
                <div className={`text-base font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-4">
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Social Activity Today
          </div>
          <div className="px-5 pb-5 pt-3">
            {[
              { label: "👁️ Daily Views", value: "1,284,930", color: "text-[var(--primary)]" },
              { label: "❤️ Likes", value: "248,102", color: "text-[var(--red)]" },
              { label: "↗️ Shares", value: "89,441", color: "text-[var(--blue)]" },
              { label: "💬 Comments", value: "44,827", color: "text-[var(--text)]" },
              { label: "🎁 Rewards Distributed", value: "18,300 pts", color: "text-[var(--gold)]" }
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-b-0">
                <div className="text-xs text-[var(--text-muted)]">{row.label}</div>
                <div className={`font-mono text-xs font-semibold ${row.color}`}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Top Content Categories
          </div>
          <div className="px-5 pb-5 pt-3">
            {[
              { label: "Crypto Analysis", value: 38, color: "var(--primary)" },
              { label: "Stock Picks", value: 24, color: "var(--accent)" },
              { label: "Forex Signals", value: 19, color: "var(--blue)" },
              { label: "DeFi Strategies", value: 12, color: "var(--green)" },
              { label: "Education", value: 7, color: "var(--gold)" }
            ].map((item) => (
              <div key={item.label} className="mb-2 last:mb-0">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">{item.label}</span>
                  <span className="font-mono text-[11px]">{item.value}%</span>
                </div>
                <div className="h-1 rounded bg-white/10">
                  <div
                    className="h-1 rounded transition-[width] duration-1000"
                    style={{ width: progressReady ? `${item.value}%` : "0%", background: item.color }}
                  />
                </div>
              </div>
            ))}
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
            {[
              {
                icon: "📈",
                title: "Top Performers Surge",
                desc: "Traders CryptoKing & AlphaFox up 34% ROI this week. Consider featuring.",
                color: "text-[var(--green)]",
                bg: "bg-[rgba(16,185,129,0.1)]"
              },
              {
                icon: "⚠️",
                title: "Engagement Dip Alert",
                desc: "Forex content engagement down 12% in last 48hrs. Investigate content quality.",
                color: "text-[var(--red)]",
                bg: "bg-[rgba(239,68,68,0.1)]"
              },
              {
                icon: "💡",
                title: "Growth Opportunity",
                desc: "South Asia region showing 3x signup growth. Scale acquisition campaigns.",
                color: "text-[var(--primary)]",
                bg: "bg-[rgba(99,102,241,0.12)]"
              },
              {
                icon: "🛡️",
                title: "Risk Flag",
                desc: "7 accounts showing unusual referral patterns. Manual review recommended.",
                color: "text-[var(--gold)]",
                bg: "bg-[rgba(245,158,11,0.1)]"
              }
            ].map((insight) => (
              <div key={insight.title} className="flex gap-3 border-b border-[var(--border)] py-3 last:border-b-0">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${insight.bg}`}>
                  {insight.icon}
                </div>
                <div>
                  <div className={`text-xs font-semibold ${insight.color}`}>{insight.title}</div>
                  <div className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                    {insight.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="text-[10px] text-[var(--text-muted)]">Trigger:</div>
              <button
                className="rounded-full border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.12)] px-2.5 py-0.5 text-[11px] font-semibold text-[#A78BFA]"
                onClick={() => onTrigger("click")}
              >
                🖱️ Click
              </button>
              <button
                className="rounded-full border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-[#FBBF24]"
                onClick={() => onTrigger("signup")}
              >
                📝 Signup
              </button>
              <button
                className="rounded-full border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-[#60A5FA]"
                onClick={() => onTrigger("newtrader")}
              >
                📈 New Trader
              </button>
            </div>
            <div className="flex max-h-[260px] flex-col gap-1 overflow-y-auto">
              {notifs.map((notif) => (
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
              ))}
              {!notifs.length && (
                <div className="py-6 text-center text-[12px] text-[var(--text-dim)]">
                  <div className="mb-1 text-2xl">🎉</div>
                  All caught up! No new alerts.
                </div>
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
                  {[
                    {
                      name: "Arjun Kumar",
                      email: "arjun@nexustrade.io",
                      role: "Trader",
                      status: "Active",
                      kyc: "Verified",
                      time: "2h ago",
                      avatar: "AK",
                      gradient: "from-[#6366F1] to-[#8B5CF6]",
                      statusClass: "bg-[rgba(16,185,129,0.12)] text-[var(--green)]",
                      kycClass: "bg-[rgba(16,185,129,0.1)] text-[var(--green)]",
                      action: "View"
                    },
                    {
                      name: "Sarah Park",
                      email: "sarah@nexustrade.io",
                      role: "Partner",
                      status: "Active",
                      kyc: "Verified",
                      time: "5h ago",
                      avatar: "SP",
                      gradient: "from-[#10B981] to-[#3B82F6]",
                      statusClass: "bg-[rgba(16,185,129,0.12)] text-[var(--green)]",
                      kycClass: "bg-[rgba(16,185,129,0.1)] text-[var(--green)]",
                      action: "View"
                    },
                    {
                      name: "Marco Rossi",
                      email: "marco@nexustrade.io",
                      role: "Customer",
                      status: "Pending",
                      kyc: "Pending",
                      time: "8h ago",
                      avatar: "MR",
                      gradient: "from-[#F59E0B] to-[#EF4444]",
                      statusClass: "bg-[rgba(245,158,11,0.1)] text-[var(--gold)]",
                      kycClass: "bg-[rgba(245,158,11,0.1)] text-[var(--gold)]",
                      action: "View"
                    },
                    {
                      name: "Zhao Hui",
                      email: "zhao@nexustrade.io",
                      role: "Trader",
                      status: "Suspended",
                      kyc: "Verified",
                      time: "1d ago",
                      avatar: "ZH",
                      gradient: "from-[#8B5CF6] to-[#EC4899]",
                      statusClass: "bg-[rgba(239,68,68,0.1)] text-[var(--red)]",
                      kycClass: "bg-[rgba(16,185,129,0.1)] text-[var(--green)]",
                      action: "Review",
                      danger: true
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
                        <span className={`rounded-full border border-white/10 px-2 py-0.5 text-[11px] font-semibold ${row.statusClass}`}>
                          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.kycClass}`}>
                          {row.kyc === "Verified" ? "✓ Verified" : "⏳ Pending"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[11px] text-[var(--text-muted)]">{row.time}</td>
                      <td className="px-3 py-3">
                        <button
                          className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                            row.danger
                              ? "border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] text-[var(--red)]"
                              : "bg-white/5 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]"
                          }`}
                        >
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
