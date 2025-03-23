# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    default-libmysqlclient-dev \
    pkg-config \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*
# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create staticfiles directory
RUN mkdir -p /app/staticfiles

# Copy application code
COPY . .

# Copy and set permissions for the startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Stop MySQL process inside the container
RUN pkill -9 mysql || true && rm -rf /var/run/mysqld/mysqld.sock

# Expose port 8000 for the backend
EXPOSE 8000

# Use start.sh as the entrypoint
ENTRYPOINT ["/app/start.sh"]
