from .models import Store
from .serializers import StoreSerializer
from rest_framework import generics
import geocoder
import requests
from rest_framework.response import Response

class ListCreateStores(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
