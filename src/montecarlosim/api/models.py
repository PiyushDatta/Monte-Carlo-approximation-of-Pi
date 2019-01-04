from random import random

from django.db import models


class Points(models.Model):
    x_point = models.FloatField()
    y_point = models.FloatField()
