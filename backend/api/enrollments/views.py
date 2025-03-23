from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Enrollment
from .serializers import EnrollmentSerializer
from api.students.models import Student
from api.courses.models import Course
from api.pagination import StandardResultsSetPagination  # Import pagination class
from django.db.models import Count
from .services import (
    get_students_and_courses,
    # get_enrollments,
    get_enrollments_per_course,
    get_student_distribution
)

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all().order_by('-enrollment_date')
    serializer_class = EnrollmentSerializer
    pagination_class = StandardResultsSetPagination  # Set custom pagination

    @action(detail=False, methods=['get'])
    def get_create(self, request):
        """Fetch students and courses for enrollment"""
        return Response(get_students_and_courses())

    def get_queryset(self):
        return Enrollment.objects.select_related('student', 'course').all()

    # def get_queryset(self):
    #     """Override queryset to use service function"""
    #     return get_enrollments()
    
    @action(detail=False, methods=['get'])
    def enrollments_per_course(self, request):
        """Get enrollment count per course"""
        return Response(get_enrollments_per_course())

    @action(detail=False, methods=['get'])
    def student_distribution(self, request):
        """Get student count per course"""
        return Response(get_student_distribution())
