/**
 * SocioHub — Central API Client
 *
 * Every HTTP call goes through this module.
 * Base URL and version prefix come from environment variables
 * defined in .env.local (NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_VERSION).
 *
 * No URLs are hardcoded anywhere in the component tree.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "/api/v1";

if (!BASE_URL) {
  console.warn(
    "[api] NEXT_PUBLIC_API_BASE_URL is not set. " +
      "API requests will fail. Add it to .env.local."
  );
}

// ── Low-level request helper ────────────────────────────────────────
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Attach JWT token if present
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new APIError(res.status, res.statusText, body);
  }

  // 204 No-Content
  if (res.status === 204) return null;

  return res.json();
}

// ── Custom error class ──────────────────────────────────────────────
export class APIError extends Error {
  constructor(status, statusText, body) {
    super(`API ${status}: ${statusText}`);
    this.status = status;
    this.body = body;
  }
}

// ── Public convenience methods ──────────────────────────────────────
export function get(path, queryParams) {
  let fullPath = path.startsWith("/api") ? path : `${API_VERSION}${path}`;
  if (queryParams) {
    const qs = new URLSearchParams(queryParams).toString();
    fullPath += `?${qs}`;
  }
  return request(fullPath);
}

export function post(path, body) {
  const fullPath = path.startsWith("/api") ? path : `${API_VERSION}${path}`;
  return request(fullPath, { method: "POST", body: JSON.stringify(body) });
}

export function patch(path, body) {
  const fullPath = path.startsWith("/api") ? path : `${API_VERSION}${path}`;
  return request(fullPath, { method: "PATCH", body: JSON.stringify(body) });
}

export function del(path) {
  const fullPath = path.startsWith("/api") ? path : `${API_VERSION}${path}`;
  return request(fullPath, { method: "DELETE" });
}

// ── Endpoint registry (mirrors config.py ENDPOINTS) ─────────────────
// Components import ENDPOINTS.xyz instead of typing path strings.
export const ENDPOINTS = {
  // Overview
  statsOverview: "/stats/overview",
  statsEngagement: "/stats/engagement",

  // Users
  usersList: "/users",
  usersStats: "/users/stats",
  usersRecent: "/users/recent",
  userDetail: (id) => `/users/${id}`,
  userSuspend: (id) => `/users/${id}/suspend`,
  userRole: (id) => `/users/${id}/role`,

  // Leaderboard
  leaderboard: "/leaderboard",

  // Analytics
  analyticsSummary: "/analytics/summary",
  analyticsSessions: "/analytics/sessions",
  analyticsTraffic: "/analytics/traffic",
  analyticsDevices: "/analytics/devices",
  analyticsRetention: "/analytics/retention",
  analyticsGrowth: "/analytics/growth",
  analyticsPeakHours: "/analytics/peak-hours",

  // Referrals
  referralsFunnel: "/referrals/funnel",
  referralsTop: "/referrals/top",
  referralsStats: "/referrals/stats",
  referralsFlags: "/referrals/flags",

  // Revenue
  revenueStats: "/revenue/stats",
  revenueMrr: "/revenue/mrr",
  revenueBreakdown: "/revenue/breakdown",
  revenueTopUsers: "/revenue/top-users",

  // Notifications
  notifications: "/notifications",
  notificationsDismiss: (id) => `/notifications/${id}`,
  notificationsClear: "/notifications/clear",

  // Admin profile (current logged-in admin)
  adminMe: "/admin/me",

  // Referral campaign links (for Quick Links panel)
  referralLinks: "/referrals/links",
};
