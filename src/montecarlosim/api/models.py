from random import random

from django.db import models


class Point(models.Model):
    x_point = models.FloatField()
    y_point = models.FloatField()
