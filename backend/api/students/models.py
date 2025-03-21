from django.db import models

class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    
    class Meta:
        db_table = "students"  # This sets the table name explicitly

    def __str__(self):
        return f"{self.name} ({self.student_id})"
