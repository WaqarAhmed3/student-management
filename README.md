# Student Management System

A full-stack application for managing student enrollments in courses, built with Django, React, and MySQL.

## Features

- CRUD operations for Students, Courses, Enrollments
- Dashboard with enrollment statistics
- Dockerized environment

## Tech Stack

- **Frontend**: React 18, Recharts, Axios
- **Backend**: Django 4.1, DRF, MySQL
- **Containerization**: Docker, docker-compose

## Setup (Docker)

1. **Clone the repository**

   ```bash
   git clone https://github.com/WaqarAhmed3/student-management.git
   cd student-management
   ```

2. **Build and start containers (From the root directory (student-management/))**

   ```bash
   docker-compose up --build
   ```

   This command builds the Docker images and starts the backend, frontend, and database services.

3. **Access the applications**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Admin Panel: http://localhost:8000/admin

4. **Create superuser (in separate terminal)**

   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Run migrations (if needed)**
   To run Django management commands (e.g., migrations) inside the backend container, use:

   ```bash
   docker-compose exec backend python manage.py migrate
   ```

6. **Stopping the Containers**
   Press Ctrl+C in the terminal where Docker Compose is running or execute:

   ```bash
   docker-compose down
   ```

## Setup Backend (Local)

1. **Clone the repository**

   ```bash
   git clone https://github.com/WaqarAhmed3/student-management.git
   cd student-management
   cd backend
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run initial migrations**

   ```bash
   python manage.py migrate
   ```

4. **Generate migrations when model changes**
   ```bash
   python manage.py makemigrations students
   python manage.py makemigrations courses
   python manage.py makemigrations enrollments
   ```
5. **Apply migrations**

   ```bash
   python manage.py migrate
   ```

6. **Seed initial data**

   ```bash
   python manage.py seed_data
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

## Setup Frontend (Local)

1. **Clone the repository**

   ```bash
   git clone https://github.com/WaqarAhmed3/student-management.git
   cd student-management
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Access Applications Locally:**
   ```bash
   Backend: http://localhost:8000
   Frontend: http://localhost:3000
   ```

## Project Structure

```
student-management/
├── backend/          # Django backend
│   ├── api/          # API endpoints
│   └── config/       # Django settings
├── frontend/         # React frontend
├── docker-compose.yml
└── README.md
```

## Testing

Backend tests:
docker-compose run backend python manage.py test

Frontend tests:
docker-compose run frontend npm test

## Future Improvements

- Implement user authentication
- Add search functionality
- Export reports feature
- Performance monitoring
