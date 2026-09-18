# ==============================================================================
# STAGE 1: Build Dependencies & Compile Wheels
# ==============================================================================
FROM python:3.12-slim AS builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install build tools required for compiling C-extensions (psycopg2, mysqlclient, Pillow)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    default-libmysqlclient-dev \
    pkg-config \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Build isolated virtual environment and explicitly install Gunicorn + dependencies
COPY backend/requirements.txt /app/requirements.txt
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir --upgrade pip setuptools wheel && \
    /opt/venv/bin/pip install --no-cache-dir gunicorn>=22.0.0 whitenoise>=6.6.0 && \
    /opt/venv/bin/pip install --no-cache-dir -r /app/requirements.txt


# ==============================================================================
# STAGE 2: Minimal Production Runtime
# ==============================================================================
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH" \
    DJANGO_SETTINGS_MODULE=config.settings.production

# Install shared runtime libraries only
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    libmariadb3 \
    libjpeg62-turbo \
    zlib1g \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy pre-compiled virtual environment from builder
COPY --from=builder /opt/venv /opt/venv

# Create a secure non-root system user and directories
RUN useradd -m -u 1000 appuser && \
    mkdir -p /app/staticfiles /app/media /app/logs && \
    chown -R appuser:appuser /app

# Copy application source code and Gunicorn configuration
COPY --chown=appuser:appuser backend/ /app/
COPY --chown=appuser:appuser deployment/production/gunicorn.conf.py /app/gunicorn.conf.py

# Switch to non-root user
USER appuser

EXPOSE 8000

# Health check to ensure Django responds
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/ || exit 1

# Launch Gunicorn with the production configuration
CMD ["gunicorn", "-c", "gunicorn.conf.py", "config.wsgi:application"]