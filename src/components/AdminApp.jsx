"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import OverviewPage from "./OverviewPage";
import LeaderboardPage from "./LeaderboardPage";
import ReferralsPage from "./ReferralsPage";
import UsersPage from "./UsersPage";
import AnalyticsPage from "./AnalyticsPage";
import RevenuePage from "./RevenuePage";

const pageMap = {
  overview: "Dashboard Overview",
  users: "User Management",
  analytics: "Analytics",
  leaderboard: "Leaderboard",
  referrals: "Referrals & Growth",
  revenue: "Revenue & Fees"
};

const notifTemplates = {
  click: {
    color: "#A78BFA",
    icon: "🖱️",
    title: "Link Clicked",
    msgs: [
      "User @CryptoFan clicked referral link — campaign: SUMMER25",
      "New click from 🇮🇳 Mumbai on referral banner ad",
      "User @TradePro88 clicked your promo link × 3 times",
      "@SilverWave clicked invite link from Telegram channel",
      "Referral link click spike: +42 in last 5 mins"
    ]
  },
  signup: {
    color: "#FBBF24",
    icon: "📝",
    title: "New Signup",
    msgs: [
      "🎉 New user signed up — Aryan Shah from 🇮🇳 Hyderabad",
      "New signup via referral: Priya Mehta (ref: @CryptoKing)",
      "🆕 Marcus Lee just registered from 🇸🇬 Singapore",
      "Signup from 🇧🇷 Brazil — Lucas Ferreira (organic)",
      "Bulk signup spike: 18 new users in past 10 mins!",
      "New signup — Nadia Al-Hassan from 🇦🇪 Dubai"
    ]
  },
  newtrader: {
    color: "#60A5FA",
    icon: "📈",
    title: "New Trader Activated",
    msgs: [
      "🚀 @NanoQuant just made their first trade — BTC/USDT",
      "New trader onboarded: Rajesh Kumar, first deposit $500",
      "@StarTrader placed first trade — ETH long at $3,240",
      "New trader @FoxAlpha completed KYC + first live trade!",
      "Trader milestone: 4,501 active traders today 🎯",
      "📊 @DeepSea opened first position — Forex EUR/USD"
    ]
  }
};

const initialNotifs = [
  {
    id: "n1",
    color: "#EF4444",
    title: "Suspicious Activity",
    msg: "User #8821 flagged for referral abuse",
    time: "2 min ago"
  },
  {
    id: "n2",
    color: "#10B981",
    title: "New Top Trader",
    msg: "@BitMaster crossed $1M in trades",
    time: "11 min ago"
  },
  {
    id: "n3",
    color: "#F59E0B",
    title: "KYC Queue",
    msg: "124 verifications pending review",
    time: "34 min ago"
  }
];

export default function AdminApp() {
  const [activePage, setActivePage] = useState("overview");
  const [notifs, setNotifs] = useState(initialNotifs);
  const [toast, setToast] = useState(null);
  const [flashType, setFlashType] = useState(null);
  const [bellPulse, setBellPulse] = useState(false);
  const [theme, setTheme] = useState("dark");
  const counterRef = useRef(100);
  const usedMsgsRef = useRef({ click: [], signup: [], newtrader: [] });
  const toastTimerRef = useRef(null);

  const badgeCount = notifs.length;

  const triggerNotif = (type) => {
    const tpl = notifTemplates[type];
    if (!tpl) return;

    const pool = tpl.msgs;
    const used = usedMsgsRef.current[type];
    if (used.length >= pool.length) usedMsgsRef.current[type] = [];

    const available = pool.filter((msg) => !usedMsgsRef.current[type].includes(msg));
    const msg = available[Math.floor(Math.random() * available.length)] || pool[0];
    usedMsgsRef.current[type] = [...usedMsgsRef.current[type], msg];

    const id = `notif-${++counterRef.current}`;
    setNotifs((prev) => [
      { id, color: tpl.color, title: `${tpl.icon} ${tpl.title}`, msg, time: "just now" },
      ...prev
    ]);

    setFlashType(type);
    setTimeout(() => setFlashType(null), 400);

    setBellPulse(true);
    setTimeout(() => setBellPulse(false), 300);

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ icon: tpl.icon, title: tpl.title, msg, color: tpl.color });
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  };

  const dismissNotif = (id) => {
    setNotifs((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllNotifs = () => {
    setNotifs([]);
  };

  useEffect(() => {
    const types = ["click", "signup", "newtrader"];
    const interval = setInterval(() => {
      const type = types[Math.floor(Math.random() * types.length)];
      triggerNotif(type);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const content = useMemo(() => {
    switch (activePage) {
      case "users":
        return <UsersPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "referrals":
        return <ReferralsPage />;
      case "revenue":
        return <RevenuePage />;
      default:
        return (
          <OverviewPage
            notifs={notifs}
            badgeCount={badgeCount}
            onTrigger={triggerNotif}
            onDismiss={dismissNotif}
            onClear={clearAllNotifs}
            flashType={flashType}
          />
        );
    }
  }, [activePage, notifs, badgeCount, flashType]);

  useEffect(() => {
    const stored = window.localStorage.getItem("nt-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    window.localStorage.setItem("nt-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="flex min-h-screen">
        <Sidebar activePage={activePage} onChange={setActivePage} />
        <div className="ml-[var(--sidebar-w)] flex min-h-screen w-full flex-col">
          <Topbar
            title={pageMap[activePage] || "Overview"}
            bellPulse={bellPulse}
            theme={theme}
            onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <main className="flex-1 p-6">{content}</main>
        </div>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[9999] min-w-[280px] max-w-[340px] rounded-xl border border-white/10 border-l-4 bg-[#1a2235] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          style={{ borderLeftColor: toast.color }}
        >
          <div className="flex items-start gap-3">
            <div className="text-xl">{toast.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[var(--text)]">{toast.title}</div>
              <div className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">
                {toast.msg.replace(/^\S+\s/, "")}
              </div>
            </div>
            <button
              className="-mt-1 text-base text-[var(--text-dim)]"
              onClick={() => setToast(null)}
              aria-label="Dismiss toast"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
