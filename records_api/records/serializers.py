# Import the notes class from models
from .models import Record
# Import serializers from the rest framework
from rest_framework import serializers

# Serializer class
class RecordSerializer(serializers.ModelSerializer):
    # Data about the serializer
    class Meta:
        model = Record
        fields = '__all__'