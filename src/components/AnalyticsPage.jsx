"use client";

export default function AnalyticsPage() {
  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        📈 Analytics
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="mb-5 grid grid-cols-5 gap-4">
        {[
          { label: "Avg Session", value: "8m 42s", change: "▲ 22s" },
          { label: "DAU", value: "24,891", change: "▲ 3.4%" },
          { label: "MAU", value: "98,441", change: "▲ 8.2%" },
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
                <div className="font-mono text-[22px] font-bold">1.84M</div>
                <div className="text-[11px] text-[var(--text-muted)]">Total Sessions</div>
              </div>
              <div>
                <div className="font-mono text-[22px] font-bold text-[var(--green)]">+12.6%</div>
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
                  d="M0,120 C25,110 50,95 75,92 C100,88 125,80 150,74 C175,68 200,72 225,60 C250,52 275,56 300,46 C325,36 350,40 375,30 C400,24 425,30 450,26 C475,22 500,28 525,22 C550,18 565,20 580,16 L580,160 L0,160 Z"
                  fill="url(#sessionsArea)"
                />
                <path
                  d="M0,120 C25,110 50,95 75,92 C100,88 125,80 150,74 C175,68 200,72 225,60 C250,52 275,56 300,46 C325,36 350,40 375,30 C400,24 425,30 450,26 C475,22 500,28 525,22 C550,18 565,20 580,16"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="375" cy="30" r="5" fill="#6366F1" opacity="0.8" />
                <circle cx="375" cy="30" r="10" fill="rgba(99,102,241,0.15)" />
              </svg>
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
                <div className="font-mono text-[22px] font-bold">4.2M</div>
                <div className="text-[11px] text-[var(--text-muted)]">Total Sessions</div>
              </div>
              <div>
                <div className="font-mono text-[22px] font-bold text-[var(--green)]">+18.4%</div>
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
                  d="M0,120 C20,110 40,95 60,92 C80,88 100,82 120,74 C140,66 160,70 180,58 C200,48 220,52 240,44 C260,34 280,40 300,28 C320,24 340,30 360,26 C380,22 400,28 420,23 C440,20 460,26 480,21 C500,18 520,24 540,19 C560,16 570,18 580,15 L580,150 L0,150 Z"
                  fill="url(#engGradAnalytics)"
                />
                <path
                  d="M0,120 C20,110 40,95 60,92 C80,88 100,82 120,74 C140,66 160,70 180,58 C200,48 220,52 240,44 C260,34 280,40 300,28 C320,24 340,30 360,26 C380,22 400,28 420,23 C440,20 460,26 480,21 C500,18 520,24 540,19 C560,16 570,18 580,15"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="300" cy="28" r="5" fill="#6366F1" opacity="0.8" />
                <circle cx="300" cy="28" r="10" fill="rgba(99,102,241,0.15)" />
              </svg>
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
            <div className="relative h-[120px]">
              <svg className="h-full w-full" viewBox="0 0 200 120" preserveAspectRatio="none">
                <path
                  d="M0,20 C30,30 60,45 90,60 C120,72 150,85 200,95"
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0,20 C30,30 60,45 90,60 C120,72 150,85 200,95 L200,120 L0,120 Z"
                  fill="rgba(16,185,129,0.12)"
                />
              </svg>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>Day 1: 100%</span>
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
            <div className="flex h-[120px] items-end gap-2">
              {[
                30, 42, 50, 55, 48, 62, 70, 74, 80, 86, 90, 100
              ].map((height, idx) => (
                <div key={height} className="flex-1 text-center">
                  <div
                    className={`mx-auto w-full rounded-t-md ${
                      idx === 11
                        ? "bg-gradient-to-b from-[var(--accent)] to-[var(--primary)] shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                        : "bg-[rgba(99,102,241,0.35)]"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div className={`mt-1 text-[9px] ${idx === 11 ? "text-[var(--primary)] font-bold" : "text-[var(--text-dim)]"}`}>
                    {[
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
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
                  d="M0,95 C40,90 80,82 120,78 C160,74 200,78 240,68 C280,60 320,64 360,52 C400,44 440,40 480,34 C520,28 550,24 580,20 L580,120 L0,120 Z"
                  fill="url(#growthLine)"
                />
                <path
                  d="M0,95 C40,90 80,82 120,78 C160,74 200,78 240,68 C280,60 320,64 360,52 C400,44 440,40 480,34 C520,28 550,24 580,20"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="480" cy="34" r="5" fill="#6366F1" opacity="0.8" />
                <circle cx="480" cy="34" r="10" fill="rgba(99,102,241,0.15)" />
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
