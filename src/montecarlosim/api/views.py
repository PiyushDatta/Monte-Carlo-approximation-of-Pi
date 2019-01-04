from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import PointsSerializer
from .models import Points


class PointsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Points.objects.all()
    serializer_class = PointsSerializer()
