from django.contrib import admin
from .models import Store


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'category',
                    'created_at', 'modified_at')
    list_editable = ('name', 'address', 'category')
