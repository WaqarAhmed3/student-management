from django.db.models import Count
from .models import Enrollment
from api.students.models import Student
from api.courses.models import Course

def get_students_and_courses():
    """Fetch all students and courses"""
    students = Student.objects.all().values('id', 'name')
    courses = Course.objects.all().values('id', 'course_name')
    return {'students': students, 'courses': courses}

# def get_enrollments():
#     """Get enrollments with related data"""
#     return Enrollment.objects.select_related('student', 'course').all()

def get_enrollments_per_course():
    """Count enrollments per course"""
    return (
        Enrollment.objects.values('course__course_name')
        .annotate(count=Count('id'))
        .order_by('-count')
    )

def get_student_distribution():
    """Count students per course"""
    return (
        Enrollment.objects.values('course__course_name')
        .annotate(count=Count('student_id'))
        .order_by('-count')
    )
