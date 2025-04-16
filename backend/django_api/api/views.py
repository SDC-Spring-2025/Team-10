from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Receipt
from .serializers import ReceiptSerializer
import os

class ReceiptViewSet(viewsets.ModelViewSet):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer
    
    def create(self, request, *args, **kwargs):
        # Handle image upload
        image = request.data.get('image')
        if not image:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Create receipt object
        receipt = Receipt(image=image)
        receipt.save()
        
        # TODO: CALL OCR FUNCTION
        # process_receipt_with_ocr(receipt)
        
        serializer = self.get_serializer(receipt)
        return Response(serializer.data, status=status.HTTP_201_CREATED)