"use client";

import { useState } from "react";
import useApi from "../lib/useApi";
import { ENDPOINTS, patch } from "../lib/api";
import { CardSkeleton, TableSkeleton, ErrorCard } from "./Skeletons";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const queryParams = {};
  if (search) queryParams.search = search;
  if (statusFilter) queryParams.status = statusFilter;
  if (roleFilter) queryParams.role = roleFilter;

  const { data: stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useApi(
    ENDPOINTS.usersStats
  );

  const { data: usersData, loading: usersLoading, error: usersError, refetch: refetchUsers } = useApi(
    ENDPOINTS.usersList,
    queryParams,
    [search, statusFilter, roleFilter]
  );

  const users = usersData?.users || usersData || [];

  const handleSuspend = async (userId) => {
    try {
      await patch(ENDPOINTS.userSuspend(userId));
      refetchUsers();
      refetchStats();
    } catch (err) {
      console.error("Failed to suspend user:", err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await patch(ENDPOINTS.userRole(userId), { role: newRole });
      refetchUsers();
    } catch (err) {
      console.error("Failed to change role:", err);
    }
  };

  const gradients = [
    "from-[#6366F1] to-[#8B5CF6]",
    "from-[#10B981] to-[#3B82F6]",
    "from-[#F59E0B] to-[#EF4444]",
    "from-[#EF4444] to-[#F97316]",
    "from-[#8B5CF6] to-[#EC4899]",
    "from-[#3B82F6] to-[#6366F1]",
  ];

  const getAvatar = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "??";

  return (
    <div className="animate-fadeUp">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[16px] font-semibold">
          👥 User Management
          <div className="h-px w-24 bg-[var(--border)]" />
        </div>
        <button className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-[12px] font-semibold text-white">
          + Add User
        </button>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-4 gap-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : statsError ? (
          <div className="col-span-4">
            <ErrorCard message={statsError.message} onRetry={refetchStats} />
          </div>
        ) : (
          [
            { label: "Total Users", key: "total_users", changeKey: "total_users_change", color: "text-[var(--green)]" },
            { label: "Active", key: "active", changeKey: "active_change", color: "text-[var(--green)]" },
            { label: "KYC Pending", key: "kyc_pending", changeKey: "kyc_pending_change", color: "text-[var(--red)]" },
            { label: "Suspended", key: "suspended", changeKey: "suspended_change", color: "text-[var(--red)]" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div
                className={`text-[11px] font-semibold uppercase tracking-[0.5px] ${
                  item.label === "Suspended" ? "text-[var(--red)]" : "text-[var(--text-muted)]"
                }`}
              >
                {item.label}
              </div>
              <div
                className={`font-mono text-[22px] font-bold ${
                  item.label === "Suspended" ? "text-[var(--red)]" : ""
                }`}
              >
                {stats?.[item.key] ?? "—"}
              </div>
              <div className={`text-[11px] font-medium ${item.color}`}>
                {stats?.[item.changeKey] ?? ""}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── User Table ─────────────────────────────────────────── */}
      <div className="surface-card">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4">
          <div className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--text-muted)]">
            All Users
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3">
              <span className="text-[12px] text-[var(--text-muted)]">🔍</span>
              <input
                className="w-40 bg-transparent text-[12px] text-[var(--text)] outline-none"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-[12px] text-[var(--text)] outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <select
              className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-[12px] text-[var(--text)] outline-none"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="trader">Trader</option>
              <option value="partner">Partner</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        <div className="px-5 pb-5 pt-3">
          {usersLoading ? (
            <TableSkeleton cols={8} rows={5} />
          ) : usersError ? (
            <ErrorCard message={usersError.message} onRetry={refetchUsers} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="text-left text-[11px] uppercase tracking-[0.5px] text-[var(--text-muted)]">
                  <tr>
                    {["User", "Email", "Location", "Role", "Status", "KYC", "Joined", "Actions"].map(
                      (header) => (
                        <th key={header} className="border-b border-[var(--border)] px-3 py-2">
                          {header}
                        </th>
                      )
                    )}
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
                          <div className="text-[12px] font-semibold">{row.name}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[12px] text-[var(--text-muted)]">{row.email}</td>
                      <td className="px-3 py-3 text-[12px] text-[var(--text-muted)]">
                        {row.location || "—"}
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
                      <td className="px-3 py-3 text-[11px] text-[var(--text-dim)]">
                        {row.joined || row.created_at || "—"}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          <button className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                            View
                          </button>
                          <button
                            className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]"
                            onClick={() => handleSuspend(row.id)}
                          >
                            Suspend
                          </button>
                          <button className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]">
                            Role ▾
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-sm text-[var(--text-muted)]">
                        No users found.
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
  );
}
