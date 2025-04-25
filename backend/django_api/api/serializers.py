from rest_framework import serializers
from .models import Receipt

class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['id', 'image', 'uploaded_at', 'merchant_name', 'total', 'date']
        read_only_fields = ['uploaded_at', 'merchant_name', 'total', 'date']
