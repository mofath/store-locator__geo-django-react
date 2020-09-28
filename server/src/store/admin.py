from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Store


@admin.register(Store)
class StoreImportExport(ImportExportModelAdmin):
    list_display = ('id', 'name', 'address', 'category',
                    'created_at', 'modified_at',)
    list_editable = ('name', 'address', 'category')