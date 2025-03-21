from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('-id')
    serializer_class = StudentSerializer
    search_fields = ['name', 'email']
    filterset_fields = ['date_of_birth']
    # filterset_fields = ['name', 'email']
