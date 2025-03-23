from django.db import models
from django.core.validators import MinLengthValidator, EmailValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta


def validate_date_of_birth(value):
    today = timezone.now().date()
    min_age_date = today - timedelta(days=16 * 365)  # Roughly 16 years
    if value > today:
        raise ValidationError("Date of birth cannot be in the future.")
    if value > min_age_date:
        raise ValidationError("Student must be at least 16 years old.")


class Student(models.Model):
    student_id = models.CharField(
        max_length=20,
        unique=True,
        validators=[MinLengthValidator(3)]
    )
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True,
    )
    date_of_birth = models.DateField(validators=[validate_date_of_birth])
    
    class Meta:
        db_table = "students"  # This sets the table name explicitly

        # indexes = [
        #     models.Index(fields=['email']),
        #     models.Index(fields=['student_id']),
        # ]

    def __str__(self):
        return f"{self.name} ({self.student_id})"
