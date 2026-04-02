"use client";

import { useState } from "react";

export default function AnalyticsPage() {
  const [activeSessionsIndex, setActiveSessionsIndex] = useState(null);
  const [activeEngagementIndex, setActiveEngagementIndex] = useState(null);
  const [activeUserGrowthIndex, setActiveUserGrowthIndex] = useState(null);
  const [activeRetentionIndex, setActiveRetentionIndex] = useState(null);

  const chartWidth = 580;
  const paddingY = 12;
  const sessionsHeight = 160;
  const engagementHeight = 150;
  const retentionWidth = 200;
  const retentionHeight = 120;

  const sessionData = [1.2, 1.28, 1.35, 1.42, 1.5, 1.58, 1.64, 1.7, 1.74, 1.78, 1.82, 1.84];
  const sessionLabels = [
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

  const engagementData = [3.0, 3.2, 3.35, 3.5, 3.6, 3.75, 3.9, 4.0, 4.05, 4.08, 4.12, 4.2];
  const engagementLabels = sessionLabels;

  const userGrowthData = [30, 42, 50, 55, 48, 62, 70, 74, 80, 86, 90, 100];
  const userGrowthLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

  const retentionData = [100, 92, 84, 76, 69, 62.4];
  const retentionLabels = ["Day 1", "Day 5", "Day 10", "Day 15", "Day 20", "Day 30"];

  const buildChartModel = (data, height, width = chartWidth) => {
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1;
    const points = data.map((value, index) => {
      const x = (width / (data.length - 1)) * index;
      const y = height - ((value - minValue) / range) * (height - paddingY * 2) - paddingY;
      return [x, y];
    });
    const line = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
    const area = `M 0 ${height} L ${points.map(([x, y]) => `${x} ${y}`).join(" L ")} L ${width} ${height} Z`;
    return { points, line, area };
  };

  const sessionModel = buildChartModel(sessionData, sessionsHeight);
  const engagementModel = buildChartModel(engagementData, engagementHeight);
  const retentionModel = buildChartModel(retentionData, retentionHeight, retentionWidth);
  const userGrowthLineModel = buildChartModel(userGrowthData, 120);

  const formatMillions = (value) => `${value.toFixed(value >= 3 ? 1 : 2)}M`;
  const formatPercent = (value) => `${value.toFixed(1)}%`;

  const calcChange = (data, index, fallback) => {
    if (index === null || index <= 0) return fallback;
    return ((data[index] - data[index - 1]) / data[index - 1]) * 100;
  };

  const defaultSessions = 1.84;
  const defaultSessionsChange = 12.6;
  const activeSessions = activeSessionsIndex !== null ? sessionData[activeSessionsIndex] : defaultSessions;
  const sessionsChange = calcChange(sessionData, activeSessionsIndex, defaultSessionsChange);
  const sessionsChangeText = `${sessionsChange >= 0 ? "+" : "-"}${Math.abs(sessionsChange).toFixed(1)}%`;

  const defaultEngagement = 4.2;
  const defaultEngagementChange = 18.4;
  const activeEngagement = activeEngagementIndex !== null ? engagementData[activeEngagementIndex] : defaultEngagement;
  const engagementChange = calcChange(engagementData, activeEngagementIndex, defaultEngagementChange);
  const engagementChangeText = `${engagementChange >= 0 ? "+" : "-"}${Math.abs(engagementChange).toFixed(1)}%`;

  const activeRetention = activeRetentionIndex !== null ? retentionData[activeRetentionIndex] : retentionData[0];
  const activeRetentionLabel = activeRetentionIndex !== null ? retentionLabels[activeRetentionIndex] : retentionLabels[0];

  const getPointer = (event) => ("touches" in event ? event.touches[0] : event);

  const handleChartMove = (event, data, model, height, setActive, width = chartWidth) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = getPointer(event);
    if (!point) return;
    const x = Math.min(Math.max(point.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(point.clientY - rect.top, 0), rect.height);
    const index = Math.round((x / rect.width) * (data.length - 1));
    const pointerY = (y / rect.height) * height;
    const lineY = model.points[index][1];
    if (Math.abs(pointerY - lineY) <= 14) {
      setActive(index);
    } else {
      setActive(null);
    }
  };

  const handleBarMove = (event, data, setActive) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = getPointer(event);
    if (!point) return;
    const x = Math.min(Math.max(point.clientX - rect.left, 0), rect.width);
    const index = Math.round((x / rect.width) * (data.length - 1));
    setActive(index);
  };
  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        📈 Analytics
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="mb-5 grid grid-cols-5 gap-4">
        {[
          { label: "Avg Session", value: "8m 42s", change: "▲ 22s" },
          { label: "Daily Active Users", value: "24,891", change: "▲ 3.4%" },
          { label: "Monthly Active User", value: "98,441", change: "▲ 8.2%" },
          { label: "Retention D30", value: "62.4%", change: "▲ 1.8%" },
          { label: "Bounce Rate", value: "24.1%", change: "▼ 2.1% good" }
        ].map((item) => (
          <div key={item.label} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
              {item.label}
            </div>
            <div className="font-mono text-[22px] font-bold">{item.value}</div>
            <div className={`text-[11px] font-medium ${item.change.startsWith("▼") ? "text-[var(--red)]" : "text-[var(--green)]"}`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>

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
            <div className="mb-3 flex gap-4">
              <div>
                <div className="font-mono text-[22px] font-bold">{formatMillions(activeSessions)}</div>
                <div className="text-[11px] text-[var(--text-muted)]">Total Sessions</div>
              </div>
              <div>
                <div
                  className={`font-mono text-[22px] font-bold ${
                    sessionsChange >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"
                  }`}
                >
                  {sessionsChangeText}
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">vs prev. period</div>
              </div>
            </div>
            <div
              className="relative h-[160px]"
              onMouseMove={(event) =>
                handleChartMove(event, sessionData, sessionModel, sessionsHeight, setActiveSessionsIndex, chartWidth)
              }
              onMouseLeave={() => setActiveSessionsIndex(null)}
              onTouchStart={(event) =>
                handleChartMove(event, sessionData, sessionModel, sessionsHeight, setActiveSessionsIndex, chartWidth)
              }
              onTouchMove={(event) =>
                handleChartMove(event, sessionData, sessionModel, sessionsHeight, setActiveSessionsIndex, chartWidth)
              }
              onClick={(event) =>
                handleChartMove(event, sessionData, sessionModel, sessionsHeight, setActiveSessionsIndex, chartWidth)
              }
            >
              <svg className="h-full w-full" viewBox={`0 0 ${chartWidth} ${sessionsHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sessionsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="80" x2={chartWidth} y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="130" x2={chartWidth} y2="130" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <path d={sessionModel.area} fill="url(#sessionsArea)" />
                <path d={sessionModel.line} fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                {activeSessionsIndex !== null && (
                  <g>
                    <line
                      x1={sessionModel.points[activeSessionsIndex][0]}
                      y1="0"
                      x2={sessionModel.points[activeSessionsIndex][0]}
                      y2={sessionsHeight}
                      stroke="rgba(148,163,184,0.35)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={sessionModel.points[activeSessionsIndex][0]}
                      cy={sessionModel.points[activeSessionsIndex][1]}
                      r="6"
                      fill="rgba(99,102,241,0.2)"
                    />
                    <circle
                      cx={sessionModel.points[activeSessionsIndex][0]}
                      cy={sessionModel.points[activeSessionsIndex][1]}
                      r="3.5"
                      fill="#6366F1"
                    />
                  </g>
                )}
              </svg>
              {activeSessionsIndex !== null && (
                <div
                  className="pointer-events-none absolute top-2"
                  style={{ left: `${(sessionModel.points[activeSessionsIndex][0] / chartWidth) * 100}%` }}
                >
                  <div className="-translate-x-1/2 rounded-lg border border-white/10 bg-[var(--surface)] px-3 py-2 text-[11px] shadow-lg">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                      {sessionLabels[activeSessionsIndex]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-[var(--text-muted)]">Total Sessions</span>
                      <span className="ml-auto font-mono text-[var(--text)]">
                        {formatMillions(sessionData[activeSessionsIndex])}
                      </span>
                    </div>
                    <div className="ml-4 text-[10px] text-[var(--text-muted)]">{sessionsChangeText} vs prev. period</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Traffic Sources
          </div>
          <div className="px-5 pb-5 pt-3">
            <div className="mx-auto flex h-[160px] w-[160px] items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="14" />
                <circle cx="60" cy="60" r="46" fill="none" stroke="#6366F1" strokeWidth="14" strokeDasharray="160 129" strokeDashoffset="0" />
                <circle cx="60" cy="60" r="46" fill="none" stroke="#8B5CF6" strokeWidth="14" strokeDasharray="90 199" strokeDashoffset="-160" />
                <circle cx="60" cy="60" r="46" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="40 249" strokeDashoffset="-250" />
                <circle cx="60" cy="60" r="32" fill="var(--surface)" />
                <text x="60" y="62" textAnchor="middle" fontSize="12" fill="var(--text)">100%</text>
              </svg>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {[
                { label: "Organic", value: "56%", color: "bg-[#6366F1]" },
                { label: "Referrals", value: "28%", color: "bg-[#8B5CF6]" },
                { label: "Paid", value: "16%", color: "bg-[#10B981]" }
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <span className={`h-2.5 w-2.5 rounded-full ${row.color}`} />
                    {row.label}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text)]">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
            <div className="mb-3 flex gap-4">
              <div>
                <div className="font-mono text-[22px] font-bold">{formatMillions(activeEngagement)}</div>
                <div className="text-[11px] text-[var(--text-muted)]">Total Sessions</div>
              </div>
              <div>
                <div
                  className={`font-mono text-[22px] font-bold ${
                    engagementChange >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"
                  }`}
                >
                  {engagementChangeText}
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">vs prev. period</div>
              </div>
            </div>
            <div
              className="relative h-[150px]"
              onMouseMove={(event) =>
                handleChartMove(event, engagementData, engagementModel, engagementHeight, setActiveEngagementIndex, chartWidth)
              }
              onMouseLeave={() => setActiveEngagementIndex(null)}
              onTouchStart={(event) =>
                handleChartMove(event, engagementData, engagementModel, engagementHeight, setActiveEngagementIndex, chartWidth)
              }
              onTouchMove={(event) =>
                handleChartMove(event, engagementData, engagementModel, engagementHeight, setActiveEngagementIndex, chartWidth)
              }
              onClick={(event) =>
                handleChartMove(event, engagementData, engagementModel, engagementHeight, setActiveEngagementIndex, chartWidth)
              }
            >
              <svg className="h-full w-full" viewBox={`0 0 ${chartWidth} ${engagementHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="engGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="75" x2={chartWidth} y2="75" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="120" x2={chartWidth} y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <path d={engagementModel.area} fill="url(#engGradAnalytics)" />
                <path d={engagementModel.line} fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                {activeEngagementIndex !== null && (
                  <g>
                    <line
                      x1={engagementModel.points[activeEngagementIndex][0]}
                      y1="0"
                      x2={engagementModel.points[activeEngagementIndex][0]}
                      y2={engagementHeight}
                      stroke="rgba(148,163,184,0.35)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={engagementModel.points[activeEngagementIndex][0]}
                      cy={engagementModel.points[activeEngagementIndex][1]}
                      r="6"
                      fill="rgba(99,102,241,0.2)"
                    />
                    <circle
                      cx={engagementModel.points[activeEngagementIndex][0]}
                      cy={engagementModel.points[activeEngagementIndex][1]}
                      r="3.5"
                      fill="#6366F1"
                    />
                  </g>
                )}
              </svg>
              {activeEngagementIndex !== null && (
                <div
                  className="pointer-events-none absolute top-2"
                  style={{ left: `${(engagementModel.points[activeEngagementIndex][0] / chartWidth) * 100}%` }}
                >
                  <div className="-translate-x-1/2 rounded-lg border border-white/10 bg-[var(--surface)] px-3 py-2 text-[11px] shadow-lg">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                      {engagementLabels[activeEngagementIndex]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-[var(--text-muted)]">Total Sessions</span>
                      <span className="ml-auto font-mono text-[var(--text)]">
                        {formatMillions(engagementData[activeEngagementIndex])}
                      </span>
                    </div>
                    <div className="ml-4 text-[10px] text-[var(--text-muted)]">{engagementChangeText} vs prev. period</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Sessions by Device
          </div>
          <div className="px-5 pb-5 pt-3">
            {[
              { label: "Desktop", value: 58, color: "var(--primary)" },
              { label: "Mobile", value: 34, color: "var(--accent)" },
              { label: "Tablet", value: 8, color: "var(--blue)" }
            ].map((row) => (
              <div key={row.label} className="mb-3 last:mb-0">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">{row.label}</span>
                  <span className="font-mono text-[11px]">{row.value}%</span>
                </div>
                <div className="h-2 rounded bg-white/10">
                  <div className="h-2 rounded" style={{ width: `${row.value}%`, background: row.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Retention Curve
          </div>
          <div className="px-5 pb-5 pt-3">
            <div className="mb-2 text-[11px] text-[var(--text-muted)]">Day 1 → Day 30</div>
            <div
              className="relative h-[120px]"
              onMouseMove={(event) =>
                handleChartMove(event, retentionData, retentionModel, retentionHeight, setActiveRetentionIndex, retentionWidth)
              }
              onMouseLeave={() => setActiveRetentionIndex(null)}
              onTouchStart={(event) =>
                handleChartMove(event, retentionData, retentionModel, retentionHeight, setActiveRetentionIndex, retentionWidth)
              }
              onTouchMove={(event) =>
                handleChartMove(event, retentionData, retentionModel, retentionHeight, setActiveRetentionIndex, retentionWidth)
              }
              onClick={(event) =>
                handleChartMove(event, retentionData, retentionModel, retentionHeight, setActiveRetentionIndex, retentionWidth)
              }
            >
              <svg className="h-full w-full" viewBox={`0 0 ${retentionWidth} ${retentionHeight}`} preserveAspectRatio="none">
                <path d={retentionModel.area} fill="rgba(16,185,129,0.12)" />
                <path
                  d={retentionModel.line}
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {activeRetentionIndex !== null && (
                  <g>
                    <line
                      x1={retentionModel.points[activeRetentionIndex][0]}
                      y1="0"
                      x2={retentionModel.points[activeRetentionIndex][0]}
                      y2={retentionHeight}
                      stroke="rgba(148,163,184,0.35)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={retentionModel.points[activeRetentionIndex][0]}
                      cy={retentionModel.points[activeRetentionIndex][1]}
                      r="6"
                      fill="rgba(16,185,129,0.18)"
                    />
                    <circle
                      cx={retentionModel.points[activeRetentionIndex][0]}
                      cy={retentionModel.points[activeRetentionIndex][1]}
                      r="3.5"
                      fill="var(--green)"
                    />
                  </g>
                )}
              </svg>
              {activeRetentionIndex !== null && (
                <div
                  className="pointer-events-none absolute top-1"
                  style={{ left: `${(retentionModel.points[activeRetentionIndex][0] / retentionWidth) * 100}%` }}
                >
                  <div className="-translate-x-1/2 rounded-lg border border-white/10 bg-[var(--surface)] px-3 py-2 text-[11px] shadow-lg">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                      {retentionLabels[activeRetentionIndex]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--green)]" />
                      <span className="text-[var(--text-muted)]">Retention</span>
                      <span className="ml-auto font-mono text-[var(--text)]">
                        {formatPercent(retentionData[activeRetentionIndex])}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>
                {activeRetentionLabel}: {formatPercent(activeRetention)}
              </span>
              <span className="text-[var(--green)]">Day 30: 62.4%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            User Growth — 12 Months
          </div>
          <div className="px-5 pb-5 pt-3">
            <div
              className="relative"
              onMouseMove={(event) => handleBarMove(event, userGrowthData, setActiveUserGrowthIndex)}
              onMouseLeave={() => setActiveUserGrowthIndex(null)}
              onTouchStart={(event) => handleBarMove(event, userGrowthData, setActiveUserGrowthIndex)}
              onTouchMove={(event) => handleBarMove(event, userGrowthData, setActiveUserGrowthIndex)}
              onClick={(event) => handleBarMove(event, userGrowthData, setActiveUserGrowthIndex)}
            >
              <div className="flex h-[120px] items-end gap-2">
                {userGrowthData.map((height, idx) => {
                  const isActive = activeUserGrowthIndex === idx;
                  return (
                    <div key={`${height}-${idx}`} className="flex-1 text-center">
                      <div
                        className={`mx-auto w-full rounded-t-md transition ${
                          isActive || idx === 11
                            ? "bg-gradient-to-b from-[var(--accent)] to-[var(--primary)] shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                            : "bg-[rgba(99,102,241,0.35)]"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className={`mt-1 text-[9px] ${
                          isActive || idx === 11
                            ? "text-[var(--primary)] font-bold"
                            : "text-[var(--text-dim)]"
                        }`}
                      >
                        {userGrowthLabels[idx]}
                      </div>
                    </div>
                  );
                })}
              </div>
              {activeUserGrowthIndex !== null && (
                <div
                  className="pointer-events-none absolute top-2"
                  style={{ left: `${(activeUserGrowthIndex / (userGrowthData.length - 1)) * 100}%` }}
                >
                  <div className="-translate-x-1/2 rounded-lg border border-white/10 bg-[var(--surface)] px-3 py-2 text-[11px] shadow-lg">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                      {userGrowthLabels[activeUserGrowthIndex]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-[var(--text-muted)]">Growth</span>
                      <span className="ml-auto font-mono text-[var(--text)]">
                        {formatPercent(userGrowthData[activeUserGrowthIndex])}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="relative mt-4"
              onMouseMove={(event) =>
                handleChartMove(event, userGrowthData, userGrowthLineModel, 120, setActiveUserGrowthIndex, chartWidth)
              }
              onMouseLeave={() => setActiveUserGrowthIndex(null)}
              onTouchStart={(event) =>
                handleChartMove(event, userGrowthData, userGrowthLineModel, 120, setActiveUserGrowthIndex, chartWidth)
              }
              onTouchMove={(event) =>
                handleChartMove(event, userGrowthData, userGrowthLineModel, 120, setActiveUserGrowthIndex, chartWidth)
              }
              onClick={(event) =>
                handleChartMove(event, userGrowthData, userGrowthLineModel, 120, setActiveUserGrowthIndex, chartWidth)
              }
            >
              <svg className="h-[120px] w-full" viewBox={`0 0 ${chartWidth} 120`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="growthLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="70" x2={chartWidth} y2="70" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="110" x2={chartWidth} y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <path d={userGrowthLineModel.area} fill="url(#growthLine)" />
                <path d={userGrowthLineModel.line} fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                {activeUserGrowthIndex !== null && (
                  <g>
                    <line
                      x1={userGrowthLineModel.points[activeUserGrowthIndex][0]}
                      y1="0"
                      x2={userGrowthLineModel.points[activeUserGrowthIndex][0]}
                      y2="120"
                      stroke="rgba(148,163,184,0.35)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={userGrowthLineModel.points[activeUserGrowthIndex][0]}
                      cy={userGrowthLineModel.points[activeUserGrowthIndex][1]}
                      r="6"
                      fill="rgba(99,102,241,0.2)"
                    />
                    <circle
                      cx={userGrowthLineModel.points[activeUserGrowthIndex][0]}
                      cy={userGrowthLineModel.points[activeUserGrowthIndex][1]}
                      r="3.5"
                      fill="#6366F1"
                    />
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        <div className="surface-card">
          <div className="px-5 pt-4 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            Peak Activity Hours
          </div>
          <div className="px-5 pb-5 pt-3">
            <div className="grid grid-cols-6 gap-1 text-[9px] text-[var(--text-dim)]">
              {[
                "6am",
                "9am",
                "12pm",
                "3pm",
                "6pm",
                "9pm"
              ].map((label) => (
                <div key={label} className="text-center">
                  {label}
                </div>
              ))}
              {[
                0.15, 0.35, 0.6, 0.45, 0.7, 0.3,
                0.1, 0.4, 0.8, 0.5, 0.9, 0.2,
                0.12, 0.28, 0.55, 0.42, 0.65, 0.25,
                0.08, 0.18, 0.3, 0.22, 0.38, 0.15
              ].map((intensity, idx) => (
                <div
                  key={idx}
                  className="h-5 rounded"
                  style={{ background: `rgba(99,102,241,${intensity})`, boxShadow: intensity > 0.7 ? "0 0 8px rgba(99,102,241,0.35)" : "none" }}
                />
              ))}
              {["Mon", "Wed", "Fri", "Sun"].map((label) => (
                <div key={label} className="text-[9px] text-[var(--text-dim)]">
                  {label}
                </div>
              ))}
              <div />
              <div />
            </div>
            <div className="mt-3 text-[11px] text-[var(--text-muted)]">
              Peak: <span className="font-semibold text-[var(--primary)]">Wed 6pm</span> &{" "}
              <span className="font-semibold text-[var(--primary)]">Fri 6pm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
