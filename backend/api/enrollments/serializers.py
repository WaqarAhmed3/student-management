from rest_framework import serializers
from .models import Enrollment  # Ensure the Enrollment model is imported

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'  # Or specify the fields explicitly