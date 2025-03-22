from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnrollmentViewSet

router = DefaultRouter()
router.register(r'enrollments', EnrollmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('enrollments-per-course/', EnrollmentViewSet.as_view({'get': 'enrollments_per_course'}), name='enrollments-per-course'),
    # path('student-distribution/', EnrollmentViewSet.as_view({'get': 'student_distribution'}), name='student-distribution'),
]
