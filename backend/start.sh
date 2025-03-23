#!/bin/sh

# Kill any process running on port 3306 (if lsof exists)
if command -v lsof >/dev/null 2>&1; then
    kill -9 $(lsof -t -i:3306) 2>/dev/null || true
else
    echo "lsof not found, skipping port 3306 reset."
fi

echo "Waiting for database..."
# while ! nc -z "$DATABASE_HOST" "$DATABASE_PORT"; do
#   sleep 0.1
# done
echo "Database available"

# Run makemigrations for all models
python manage.py makemigrations students
python manage.py makemigrations courses
python manage.py makemigrations enrollments

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
