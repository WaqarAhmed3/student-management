from django.db import models

class Course(models.Model):
    course_code = models.CharField(max_length=20, unique=True)
    course_name = models.CharField(max_length=100)
    instructor = models.CharField(max_length=100)
    credits = models.PositiveIntegerField()

    class Meta:
        db_table = "courses"

    def __str__(self):
        return f"{self.course_name} ({self.course_code})"
