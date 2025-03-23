from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Course(models.Model):
    course_code = models.CharField(max_length=20, unique=True)
    course_name = models.CharField(max_length=100)
    instructor = models.CharField(max_length=100)
    credits = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])


    class Meta:
        db_table = "courses"

    def __str__(self):
        return f"{self.course_name} ({self.course_code})"
