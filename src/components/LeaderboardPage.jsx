"use client";

import { useState } from "react";

const filters = ["All-Time", "Monthly", "Weekly", "Daily"];

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState("All-Time");

  return (
    <div className="animate-fadeUp">
      <div className="mb-4 flex items-center gap-3 text-[16px] font-semibold">
        🏆 Leaderboard
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          {
            medal: "🥈",
            name: "BitMaster_Pro",
            roi: "+284%",
            meta: "1,284 followers · 892 referrals",
            badge: "Trader",
            avatar: "BM",
            gradient: "from-[#9CA3AF] to-[#6B7280]",
            card: "bg-[rgba(156,163,175,0.07)] border-[rgba(156,163,175,0.15)]",
            roiColor: "text-[#9CA3AF]"
          },
          {
            medal: "🥇",
            name: "CryptoKing",
            roi: "+412%",
            meta: "4,821 followers · 1,204 referrals",
            badge: "⭐ Elite Trader",
            avatar: "CK",
            gradient: "from-[#F59E0B] to-[#F97316]",
            card: "bg-[rgba(245,158,11,0.07)] border-[rgba(245,158,11,0.2)]",
            roiColor: "text-[#F59E0B]",
            highlight: true
          },
          {
            medal: "🥉",
            name: "AlphaFox",
            roi: "+219%",
            meta: "890 followers · 441 referrals",
            badge: "Trader",
            avatar: "AF",
            gradient: "from-[#CD7F32] to-[#92400E]",
            card: "bg-[rgba(180,120,60,0.07)] border-[rgba(180,120,60,0.15)]",
            roiColor: "text-[#CD7F32]"
          }
        ].map((item) => (
          <div
            key={item.name}
            className={`rounded-[var(--radius-sm)] border p-4 text-center transition hover:-translate-y-1 ${item.card} ${
              item.highlight ? "scale-[1.04]" : ""
            }`}
          >
            <div className="mb-2 text-[22px]">{item.medal}</div>
            <div
              className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-base font-bold`}
            >
              {item.avatar}
            </div>
            <div className="text-[13px] font-semibold">{item.name}</div>
            <div className={`font-mono text-[18px] font-bold ${item.roiColor}`}>{item.roi}</div>
            <div className="text-[10px] text-[var(--text-muted)]">{item.meta}</div>
            <div className="mt-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-[var(--text)]">
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

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
          <select className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-[12px] text-[var(--text)] outline-none">
            <option>All Roles</option>
            <option>Traders</option>
            <option>Partners</option>
            <option>Customers</option>
          </select>
          <div className="flex h-8 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3">
            <span className="text-[12px] text-[var(--text-muted)]">🔍</span>
            <input
              className="w-32 bg-transparent text-[12px] text-[var(--text)] outline-none"
              placeholder="Search user..."
            />
          </div>
        </div>
      </div>

      <div className="surface-card">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
              <tr>
                {[
                  "Rank",
                  "User",
                  "Role",
                  "ROI %",
                  "Engagement",
                  "Referrals",
                  "Badge",
                  "30D Trend",
                  "Action"
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
                  medal: "bg-[rgba(245,158,11,0.2)] text-[#F59E0B]",
                  user: "CryptoKing",
                  email: "crypto@nexustrade.io",
                  role: "Trader",
                  roi: "+412%",
                  engagement: "98.4",
                  refs: "1,204",
                  badge: "⭐ Elite",
                  badgeClass: "bg-[rgba(245,158,11,0.1)] text-[var(--gold)]",
                  avatar: "CK",
                  gradient: "from-[#F59E0B] to-[#F97316]",
                  path: "M0,20 C10,18 20,12 30,8 C40,4 50,6 60,2"
                },
                {
                  rank: 2,
                  medal: "bg-[rgba(156,163,175,0.2)] text-[#9CA3AF]",
                  user: "BitMaster_Pro",
                  email: "bitmaster@nexustrade.io",
                  role: "Trader",
                  roi: "+284%",
                  engagement: "94.1",
                  refs: "892",
                  badge: "💎 Pro",
                  badgeClass: "bg-[rgba(99,102,241,0.1)] text-[var(--primary)]",
                  avatar: "BM",
                  gradient: "from-[#9CA3AF] to-[#6B7280]",
                  path: "M0,16 C10,14 20,10 30,12 C40,14 50,8 60,6"
                },
                {
                  rank: 3,
                  medal: "bg-[rgba(180,120,60,0.2)] text-[#CD7F32]",
                  user: "AlphaFox",
                  email: "alpha@nexustrade.io",
                  role: "Trader",
                  roi: "+219%",
                  engagement: "88.7",
                  refs: "441",
                  badge: "🔥 Rising",
                  badgeClass: "bg-[rgba(16,185,129,0.1)] text-[var(--green)]",
                  avatar: "AF",
                  gradient: "from-[#CD7F32] to-[#92400E]",
                  path: "M0,18 C10,16 20,14 30,10 C40,6 50,8 60,4"
                },
                {
                  rank: 4,
                  medal: "bg-white/5 text-[var(--text-muted)]",
                  user: "DeepWave",
                  email: "deepwave@nexustrade.io",
                  role: "Partner",
                  roi: "+187%",
                  engagement: "82.3",
                  refs: "1,820",
                  badge: "🌟 Expert",
                  badgeClass: "bg-[rgba(139,92,246,0.1)] text-[var(--accent)]",
                  avatar: "DW",
                  gradient: "from-[#3B82F6] to-[#6366F1]",
                  path: "M0,14 C10,16 20,12 30,14 C40,16 50,10 60,12"
                },
                {
                  rank: 5,
                  medal: "bg-white/5 text-[var(--text-muted)]",
                  user: "NanoQuant",
                  email: "nano@nexustrade.io",
                  role: "Trader",
                  roi: "+162%",
                  engagement: "79.8",
                  refs: "328",
                  badge: "🔥 Rising",
                  badgeClass: "bg-[rgba(16,185,129,0.1)] text-[var(--green)]",
                  avatar: "NQ",
                  gradient: "from-[#EC4899] to-[#8B5CF6]",
                  path: "M0,20 C10,15 20,18 30,12 C40,6 50,10 60,8"
                }
              ].map((row) => (
                <tr key={row.user} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-3 py-3">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${row.medal}`}>
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
                      <div>
                        <div className="text-[12px] font-semibold">{row.user}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">{row.email}</div>
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
                  <td className="px-3 py-3 font-mono text-[12px]">{row.refs}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.badgeClass}`}>
                      {row.badge}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <svg width="60" height="24" viewBox="0 0 60 24">
                      <path d={row.path} fill="none" stroke="var(--green)" strokeWidth="1.5" />
                    </svg>
                  </td>
                  <td className="px-3 py-3">
                    <button className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
