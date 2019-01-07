from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import PointSerializer
from .models import Point

from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt


class PointViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Point.objects.all()
    serializer_class = PointSerializer


