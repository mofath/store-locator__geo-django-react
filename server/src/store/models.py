from django.contrib.gis.db import models
from enum import Enum

class Store(models.Model):
    class CategoryChoice(Enum):
        HOTEL = 'hotel'
        Grocey = 'grocery'
        RESTAURANT = 'restaurant'

    name = models.CharField(max_length=25)
    address = models.CharField(max_length=255)
    category = models.CharField(max_length=25, null=True, blank=True,
                                choices=[(tag, tag.value)
                                         for tag in CategoryChoice]
                                )
    location = models.PointField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
