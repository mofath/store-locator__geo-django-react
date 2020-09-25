from django.contrib.gis.db import models



class Store(models.Model):
    name = models.CharField(max_length=25)
    address = models.CharField(max_length=255)
    category = models.CharField(max_length=255, null=True, blank=True)
    location = models.PointField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
