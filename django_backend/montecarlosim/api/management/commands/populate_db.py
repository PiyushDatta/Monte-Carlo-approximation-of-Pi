from random import random

from django.core.management.base import BaseCommand

from montecarlosim.api.models import Point

from progress.bar import Bar


class Command(BaseCommand):
    # TODO: Implement after
    args = '<foo bar ...>'
    help = 'our help string comes here, implement after'

    def _create_points(self, number_of_points=9500):
        """
        Creates number of Points objects in our db designated by number_of_points variable. 
        Limit set to 9500 (heroku adds some extra lines to our 9500) because heroku's postgreSQL only allows 10k lines. :(
        :param number_of_points: integer
        :return: None
        """
        bar = Bar('Processing', max=number_of_points)
        for _ in range(number_of_points):
            point = Point(x_point=generate_point(), y_point=generate_point())
            point.save()
            bar.next()

        bar.finish()

    # TODO: Implement after
    def _flush_all_points(self):
        pass

    def handle(self, *args, **options):
        """
        Used by our cli to handle the call/request to send to our db.
        :param args: to be implemented
        :param options: to be implemented
        :return: None
        """
        self._create_points()


def generate_point(length_of_field=1):
    """
    Generates a random float number.
    :param length_of_field: int
    :return: float
    """
    if isinstance(length_of_field, int):
        return (.5 - random()) * length_of_field
    else:
        raise TypeError("length_of_field must be an integer")
