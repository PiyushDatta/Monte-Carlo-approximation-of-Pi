from random import random

from django.db import models


class Points(models.Model):
    x_point = models.FloatField()
    y_point = models.FloatField()


def generate_x_point(length_of_field=1):
    if isinstance(length_of_field, int):
        return (.5 - random()) * length_of_field
    else:
        raise TypeError("length_of_field must be an integer")
