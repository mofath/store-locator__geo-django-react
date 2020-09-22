from django.conf.urls import url
from .views import ListCreateStores

urlpatterns = [
    url(r'', ListCreateStores.as_view(), name='list_stores'),
]