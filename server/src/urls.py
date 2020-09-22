from django.contrib import admin
from django.urls import path
from django.urls import path , include

urlpatterns = [
    path('store/',include('src.store.urls')),
    path('admin/', admin.site.urls),
]
