from .models import Store
from .serializers import StoreSerializer
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.db.models.functions import Distance

class ListCreateStores(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

    def get_queryset(self):
        qs =super().get_queryset()
        latitude = self.request.query_params.get('lat', None)
        longitude = self.request.query_params.get('lng', None)

        if latitude and longitude:
            pnt = GEOSGeometry('Point(' + str(latitude) + ' ' + str(longitude) + ')', srid=4326)
            qs= qs.annotate(distance=Distance('location', pnt)).order_by('distance')

        return qs