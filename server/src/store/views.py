from .models import Store
from .serializers import StoreSerializer
from rest_framework import generics

class ListCreateStores(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer