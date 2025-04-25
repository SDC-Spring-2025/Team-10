from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from backend.enhancer import process_receipt
from backend.objectview import ObjectView
from .models import Receipt
from .serializers import ReceiptSerializer
import os
import tempfile
from config import read_config 

class ReceiptViewSet(viewsets.ModelViewSet):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer

    # Helper function to get 
    def get_config():
        base_path = os.path.dirname(os.path.abspath(__file__))
        config_path = os.path.join(base_path, "eng.yml")  # adjust path if needed
        raw_config = read_config(config=config_path)
        return ObjectView(raw_config)
    
    def create(self, request, *args, **kwargs):
        # Handle image upload
        image = request.data.get('image')
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Save image temporarily
        temp_path = tempfile.mktemp(suffix=".jpg")
        with open(temp_path, 'wb+') as f:
            for chunk in image.chunks():
                f.write(chunk)

        config = self.get_config()

        processed_receipt = process_receipt(config, os.path.basename(temp_path))

         # Use OCR values by default, override with user input if present
        merchant_name = request.data.get('merchant_name') or processed_receipt.market or ""
        date = request.data.get('date') or processed_receipt.date or None
        total = request.data.get('total') or processed_receipt.sum or 0.0

        receipt = Receipt.objects.create(
            image=image,
            merchant_name=merchant_name,
            date=date,
            total=total,
        )
        
        serializer = self.get_serializer(receipt)
        return Response(serializer.data, status=status.HTTP_201_CREATED)