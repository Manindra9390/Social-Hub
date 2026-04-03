"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import OverviewPage from "./OverviewPage";
import LeaderboardPage from "./LeaderboardPage";
import ReferralsPage from "./ReferralsPage";
import UsersPage from "./UsersPage";
import AnalyticsPage from "./AnalyticsPage";
import RevenuePage from "./RevenuePage";
import useApi from "../lib/useApi";
import { del, post, ENDPOINTS } from "../lib/api";

const pageMap = {
  overview: "Dashboard Overview",
  users: "User Management",
  analytics: "Analytics",
  leaderboard: "Leaderboard",
  referrals: "Referrals & Growth",
  revenue: "Revenue & Fees"
};

// Colour/icon schema for notification types returned by the backend
const TYPE_STYLE = {
  click:      { color: "#A78BFA", icon: "🖱️" },
  signup:     { color: "#FBBF24", icon: "📝" },
  newtrader:  { color: "#60A5FA", icon: "📈" },
  warning:    { color: "#EF4444", icon: "⚠️" },
  info:       { color: "#10B981", icon: "ℹ️" },
  kyc:        { color: "#F59E0B", icon: "🪪" },
};

function styleFor(type) {
  return TYPE_STYLE[type] || { color: "#6366F1", icon: "🔔" };
}

export default function AdminApp() {
  const [activePage, setActivePage] = useState("overview");
  const [toast, setToast] = useState(null);
  const [flashType, setFlashType] = useState(null);
  const [bellPulse, setBellPulse] = useState(false);
  const [theme, setTheme] = useState("dark");
  const toastTimerRef = useRef(null);
  const pollRef = useRef(null);

  // ── Fetch notifications from backend ─────────────────────────────
  const {
    data: notifData,
    loading: notifLoading,
    refetch: refetchNotifs,
  } = useApi(ENDPOINTS.notifications);

  const notifs = useMemo(() => {
    const raw = notifData?.notifications || notifData || [];
    return raw.map((n) => {
      const s = styleFor(n.type);
      return {
        id: n.id,
        color: n.color || s.color,
        title: n.title || `${s.icon} ${n.type ?? "Notification"}`,
        msg: n.message || n.msg || "",
        time: n.time || n.created_at || "just now",
      };
    });
  }, [notifData]);

  const badgeCount = notifs.length;

  // ── Fetch admin profile ───────────────────────────────────────────
  const { data: adminData } = useApi(ENDPOINTS.adminMe);
  const adminName     = adminData?.name     || adminData?.full_name || "Super Admin";
  const adminEmail    = adminData?.email    || "admin@nexustrade.io";
  const adminInitials = adminData?.initials || adminName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // ── Fetch user/kyc badge counts for Sidebar ───────────────────────
  const { data: userStats } = useApi(ENDPOINTS.usersStats);
  const kycPendingBadge = userStats?.kyc_pending ?? null;

  // ── Poll notifications every 30 s ─────────────────────────────────
  useEffect(() => {
    pollRef.current = setInterval(() => refetchNotifs(), 30_000);
    return () => clearInterval(pollRef.current);
  }, [refetchNotifs]);

  // ── Dismiss a single notification via API ─────────────────────────
  const dismissNotif = useCallback(async (id) => {
    try {
      await del(ENDPOINTS.notificationsDismiss(id));
    } catch {
      // optimistic: ignore error, UI will re-sync on next poll
    } finally {
      refetchNotifs();
    }
  }, [refetchNotifs]);

  // ── Clear all notifications via API ──────────────────────────────
  const clearAllNotifs = useCallback(async () => {
    try {
      await post(ENDPOINTS.notificationsClear);
    } catch {
      // optimistic
    } finally {
      refetchNotifs();
    }
  }, [refetchNotifs]);

  // ── Show a toast for link-click events (local UI only) ────────────
  const showToast = useCallback((icon, title, msg, color) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setBellPulse(true);
    setTimeout(() => setBellPulse(false), 300);
    setToast({ icon, title, msg, color });
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  // ── Track referral link clicks ────────────────────────────────────
  const trackLink = useCallback((url, label) => {
    const s = styleFor("click");
    setFlashType("click");
    setTimeout(() => setFlashType(null), 400);
    showToast(s.icon, "Link Clicked", `Admin opened: ${label}`, s.color);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, [showToast]);

  // ── Theme persistence ─────────────────────────────────────────────
  useEffect(() => {
    const stored = window.localStorage.getItem("nt-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
    window.localStorage.setItem("nt-theme", theme);
  }, [theme]);

  // ── Page content ─────────────────────────────────────────────────
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
            notifLoading={notifLoading}
            badgeCount={badgeCount}
            onDismiss={dismissNotif}
            onClear={clearAllNotifs}
            flashType={flashType}
            onLinkClick={trackLink}
          />
        );
    }
  }, [activePage, notifs, notifLoading, badgeCount, flashType, dismissNotif, clearAllNotifs, trackLink]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="flex min-h-screen">
        <Sidebar
          activePage={activePage}
          onChange={setActivePage}
          kycPendingBadge={kycPendingBadge}
          notifCount={badgeCount}
          adminName={adminName}
          adminEmail={adminEmail}
          adminInitials={adminInitials}
        />
        <div className="ml-[var(--sidebar-w)] flex min-h-screen w-full flex-col">
          <Topbar
            title={pageMap[activePage] || "Overview"}
            bellPulse={bellPulse}
            notifCount={badgeCount}
            adminInitials={adminInitials}
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
                {toast.msg}
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
