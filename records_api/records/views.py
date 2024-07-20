from django.shortcuts import render
# Import the Note class
from .models import Record
# Import the viewset
from rest_framework import viewsets
# Import the serializer
from .serializers import RecordSerializer

# Create your views here.

class RecordsViewset(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    queryset = Record.objects.all()