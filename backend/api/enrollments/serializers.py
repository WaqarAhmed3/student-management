from rest_framework import serializers
from .models import Enrollment  # Ensure the Enrollment model is imported

class EnrollmentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    course_name = serializers.CharField(source='course.course_name', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = [
            'id',
            'enrollment_date',
            'student',
            'course',
            'student_name',
            'course_name'
        ]
        extra_kwargs = {
            'student': {'write_only': True},
            'course': {'write_only': True}
        }