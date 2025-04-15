from rest_framework import serializers
from .models import Receipt

class ReceiptUploadSerializer(serializers.Serializer):
    class Meta:
        model = Receipt
        fields = ['id', 'image', 'uploaded_at', 'merchant_name', 'total_amount', 'date']
        read_only_fields = ['uploaded_at', 'merchant_name', 'total_amount', 'date']