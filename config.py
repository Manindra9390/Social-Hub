import os


class Config:
    """
    Central configuration for the SocioHub backend.
    All values are read from environment variables with sensible defaults
    for local development. In production, override via .env or system env.
    """

    # ── Server ───────────────────────────────────────────────────────────
    HOST = os.getenv("BACKEND_HOST", "0.0.0.0")
    PORT = int(os.getenv("BACKEND_PORT", 8000))
    DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes", "t")

    # ── Database ─────────────────────────────────────────────────────────
    DB_USER = os.getenv("DB_USER", "admin")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "secret")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_NAME = os.getenv("DB_NAME", "sociohub_db")

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    # ── Authentication / Security ────────────────────────────────────────
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret-key")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", 30)
    )

    # ── Redis ────────────────────────────────────────────────────────────
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # ── CORS — allowed origins for the web dashboard ─────────────────────
    CORS_ORIGINS = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")

    # ── Frontend / Dashboard URL (used when backend needs to link back) ──
    DASHBOARD_URL = os.getenv("DASHBOARD_URL", "http://localhost:3000")

    # ── API versioning ───────────────────────────────────────────────────
    API_V1_PREFIX = os.getenv("API_V1_PREFIX", "/api/v1")

    # ── API Endpoint Paths (centralised, no hardcoding in frontend) ──────
    # These are exposed to the Next.js frontend via the /api/config route.
    ENDPOINTS = {
        # Overview / Stats
        "stats_overview": "/api/v1/stats/overview",
        "stats_engagement": "/api/v1/stats/engagement",

        # Users
        "users_list": "/api/v1/users",
        "users_stats": "/api/v1/users/stats",
        "users_recent": "/api/v1/users/recent",
        "users_detail": "/api/v1/users/{user_id}",
        "users_suspend": "/api/v1/users/{user_id}/suspend",
        "users_role": "/api/v1/users/{user_id}/role",

        # Leaderboard
        "leaderboard": "/api/v1/leaderboard",

        # Analytics
        "analytics_summary": "/api/v1/analytics/summary",
        "analytics_sessions": "/api/v1/analytics/sessions",
        "analytics_traffic": "/api/v1/analytics/traffic",
        "analytics_devices": "/api/v1/analytics/devices",
        "analytics_retention": "/api/v1/analytics/retention",
        "analytics_growth": "/api/v1/analytics/growth",
        "analytics_peak_hours": "/api/v1/analytics/peak-hours",

        # Referrals
        "referrals_funnel": "/api/v1/referrals/funnel",
        "referrals_top": "/api/v1/referrals/top",
        "referrals_stats": "/api/v1/referrals/stats",
        "referrals_flags": "/api/v1/referrals/flags",

        # Revenue
        "revenue_stats": "/api/v1/revenue/stats",
        "revenue_mrr": "/api/v1/revenue/mrr",
        "revenue_breakdown": "/api/v1/revenue/breakdown",
        "revenue_top_users": "/api/v1/revenue/top-users",

        # Notifications
        "notifications": "/api/v1/notifications",
    }


config = Config()
