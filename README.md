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

## Project Structure

```
student-management/
├── backend/          # Django backend
│   ├── api/          # API endpoints
│   └── └── courses
│   └── └── └── models.py
│   └── └── └── serializers.py
│   └── └── └── urls.py
│   └── └── └── views.py
│   └── └── enrollments
│   └── └── └── models.py
│   └── └── └── services.py
│   └── └── └── serializers.py
│   └── └── └── urls.py
│   └── └── └── views.py
│   └── └── students
│   └── └── └── models.py
│   └── └── └── serializers.py
│   └── └── └── urls.py
│   └── └── └── views.py
│   └── └── management
│   └── └── └── commands
│   └── └── └── └── seed_data.py
│   └── └── app.py
│   └── └── pagination.py
│   └── config/       # Django settings
│   └── └── settings.py
│   └── └── urls.py
│   └── Dockerfile
│   └── manage.py
│   └── requirements.txt
├── frontend/         # React frontend
│   ├── src/
│   ├── ├── components/
│   ├── ├── ├── courses/
│   ├── ├── ├── ├── CourseForm.tsx
│   ├── ├── ├── enrollments/
│   ├── ├── ├── ├── EnrollmentForm.tsx
│   ├── ├── ├── students/
│   ├── ├── ├── ├── StudentForm.tsx
│   ├── ├── ├── layout/
│   ├── ├── ├── ├── AppBar.tsx
│   ├── ├── ├── ├── Layout.tsx
│   ├── ├── ├── ├── sidebar.tsx
│   ├── ├── ├── UI/
│   ├── ├── ├── ├── CustomDropdown.tsx
│   ├── ├── pages/
│   ├── ├── ├── Courses.tsx
│   ├── ├── ├── Dashboard.tsx
│   ├── ├── ├── Enrollments.tsx
│   ├── ├── ├── Students.tsx
│   ├── ├── services/
│   ├── ├── ├── courseService.ts
│   ├── ├── ├── enrollmentService.ts
│   ├── ├── ├── studentService.ts
│   ├── ├── types/
│   ├── ├── ├── courseTypes.ts
│   ├── ├── ├── enrollmentTypes.ts
│   ├── ├── ├── studentTypes.ts
│   ├── ├── App.tsx
│   ├── ├── index.tsx
│   └── Dockerfile
│   └── package.json
├── .env
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Setup (Docker)

1. **Clone the repository**

   ```bash
   git clone https://github.com/WaqarAhmed3/student-management.git
   cd student-management
   ```

2. **Create and configure .env file**

   Create a .env file in the root directory and add the following content:

   ```bash
   # General
   DEBUG=True
   SECRET_KEY=your-very-secure-secret-key

   # Database
   DATABASE_ENGINE=django.db.backends.mysql
   DATABASE_NAME=student_management_db
   DATABASE_USER=root
   DATABASE_PASSWORD=
   # DATABASE_HOST=localhost
   DATABASE_HOST=db
   DATABASE_PORT=3306
   PRODUCTION=false

   # Django Allowed Hosts
   ALLOWED_HOSTS=localhost,127.0.0.1

   # CORS Settings
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

   # React Environment Variables (for frontend)
   # Development
   DOCKER_TARGET=development
   FRONTEND_PORT=3000
   CONTAINER_PORT=3000
   REACT_APP_API_URL=http://localhost:8000/api

   # Production (uncomment when needed)
   # DOCKER_TARGET=production
   # CONTAINER_PORT=80
   # FRONTEND_PORT=80
   # REACT_APP_API_URL=http://backend:8000/api
   ```

3. **Build and start containers (From the root directory (student-management/))**

   ```bash
   docker-compose up
   ```

   This command builds the Docker images and starts the backend, frontend, and database services.

4. **Access the applications**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Admin Panel: http://localhost:8000/admin

5. **Create superuser (in separate terminal)**

   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

6. **Run migrations (if needed)**
   To run Django management commands (e.g., migrations) inside the backend container, use:

   ```bash
   docker-compose exec backend python manage.py migrate
   ```

7. **Stopping the Containers**
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

## Access Application Locally

```bash
Backend: http://localhost:8000
Frontend: http://localhost:3000
```

## Future Improvements

- Testing Scripts
- Implement user authentication
- Add search functionality
- Export reports feature
- Performance monitoring
