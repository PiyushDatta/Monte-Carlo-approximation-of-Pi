from rest_framework import serializers
from .models import Points


class PointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Points
        fields = ('x_point', 'y_point')
