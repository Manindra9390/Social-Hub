"use client";

/**
 * Reusable loading skeleton for dashboard cards.
 * Used as a placeholder while API data is being fetched.
 */
export function CardSkeleton({ rows = 3 }) {
  return (
    <div className="animate-pulse rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="mb-2 h-3 w-24 rounded bg-white/10" />
      <div className="mb-2 h-7 w-20 rounded bg-white/10" />
      <div className="h-3 w-16 rounded bg-white/10" />
    </div>
  );
}

export function TableSkeleton({ cols = 6, rows = 5 }) {
  return (
    <div className="animate-pulse">
      <div className="mb-2 flex gap-3 border-b border-[var(--border)] py-2">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-3 flex-1 rounded bg-white/10" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-3 border-b border-[var(--border)] py-3">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-3 flex-1 rounded bg-white/8" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = "h-40" }) {
  return (
    <div className={`animate-pulse ${height} rounded bg-white/5`} />
  );
}

export function ErrorCard({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius)] border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.05)] p-8 text-center">
      <div className="mb-2 text-2xl">⚠️</div>
      <div className="mb-1 text-sm font-semibold text-[var(--red)]">
        Failed to load data
      </div>
      <div className="mb-3 text-xs text-[var(--text-muted)]">
        {message || "Could not reach the server. Is the backend running?"}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-xs font-semibold text-white"
        >
          Retry
        </button>
      )}
    </div>
  );
}
