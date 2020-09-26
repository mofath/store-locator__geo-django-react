
from rest_framework import serializers
from .models import Store


class StoreSerializer(serializers.ModelSerializer):
    distance = serializers.DecimalField(
        source='distance.km', max_digits=10, decimal_places=1, required=False, read_only=True
    )

    class Meta:
        model = Store
        fields = ('id', 'name', 'address', 'location', 'distance', 'category')
        #read_only_fields = ('location',)
