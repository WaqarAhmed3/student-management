#!/bin/sh

echo "Waiting for database..."
# while ! nc -z "$DATABASE_HOST" "$DATABASE_PORT"; do
#   sleep 0.1
# done
echo "Database available"

# Run migrations
python manage.py migrate

# Seed initial data
python manage.py seed_data

# Collect static files
python manage.py collectstatic --noinput

if [ "$PRODUCTION" = "true" ]; then
    echo "Starting application in production mode..."
    exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
else
    echo "Starting application in development mode..."
    exec python manage.py runserver 0.0.0.0:8000
fi
