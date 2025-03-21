from django.db import models
from api.students.models import Student
from api.courses.models import Course

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)

    class Meta:
        # unique_together = ('student', 'course')
        db_table = "enrollments"

    def __str__(self):
        return f"{self.student.name} enrolled in {self.course.course_name}"
