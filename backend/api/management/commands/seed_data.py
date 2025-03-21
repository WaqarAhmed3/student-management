from django.core.management.base import BaseCommand
from api.students.models import Student
from api.courses.models import Course
from api.enrollments.models import Enrollment
from faker import Faker
import random
from datetime import date, timedelta

fake = Faker()

class Command(BaseCommand):
    help = 'Seeds the database with students, courses, and enrollments'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding data...")

        # Clear existing data
        Student.objects.all().delete()
        Course.objects.all().delete()
        Enrollment.objects.all().delete()

        # Create 10 students
        students = []
        for _ in range(10):
            student = Student.objects.create(
                student_id=fake.unique.bothify(text='STD-#####'),
                name=fake.name(),
                email=fake.unique.email(),
                date_of_birth=fake.date_of_birth(minimum_age=18, maximum_age=25)
            )
            students.append(student)
        self.stdout.write(self.style.SUCCESS('Created 10 students'))

        # Create 5 courses
        courses = []
        for i in range(5):
            course = Course.objects.create(
                course_code=fake.unique.bothify(text='CRS-#####'),
                course_name=fake.catch_phrase(),
                instructor=fake.name(),
                credits=random.randint(1, 4)
            )
            courses.append(course)
        self.stdout.write(self.style.SUCCESS('Created 5 courses'))

        # Create 20 enrollments
        for _ in range(20):
            Enrollment.objects.create(
                student=random.choice(students),
                course=random.choice(courses),
                enrollment_date=fake.date_between(start_date='-1y', end_date='today')
            )
        self.stdout.write(self.style.SUCCESS('Created 20 enrollments'))

        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))