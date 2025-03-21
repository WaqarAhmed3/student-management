from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet

router = DefaultRouter()
router.register(r'', StudentViewSet)  # This will generate standard CRUD endpoints

urlpatterns = [
    path('', include(router.urls)),  # Includes all API routes for students
]