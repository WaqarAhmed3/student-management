from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Enrollment
from .serializers import EnrollmentSerializer
from api.students.models import Student
from api.courses.models import Course
from api.pagination import StandardResultsSetPagination  # Import pagination class
from django.db.models import Count

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all().order_by('-enrollment_date')
    serializer_class = EnrollmentSerializer
    pagination_class = StandardResultsSetPagination  # Set custom pagination

    @action(detail=False, methods=['get'])
    def get_create(self, request):
        students = Student.objects.all().values('id', 'name')
        courses = Course.objects.all().values('id', 'course_name')
        return Response({
            'students': students,
            'courses': courses
        })

    def get_queryset(self):
        return Enrollment.objects.select_related('student', 'course').all()

    
    @action(detail=False, methods=['get'])
    def enrollments_per_course(self, request):
        data = (
            Enrollment.objects.values('course__course_name')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        return Response(data)

    @action(detail=False, methods=['get'])
    def student_distribution(self, request):
        data = (
            Enrollment.objects.values('course__course_name')
            .annotate(count=Count('student_id'))
            .order_by('-count')
        )
        return Response(data)
