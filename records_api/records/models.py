from django.db import models

# Create your models here.

"""
class Record
    title str
    content str
    dateCreated datetime
"""

# The note class
class Record(models.Model):
    # The title of the note
    title = models.CharField(max_length=255)

    # The message or content of the note
    content = models.TextField()

    # The date and time of when the note was created
    dateCreated = models.DateTimeField(auto_now_add=True)

    # A simple string representation of the note
    def __str__(self):
        return self.title

