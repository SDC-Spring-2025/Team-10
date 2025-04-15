from django.db import models

class Receipt(models.Model):
    image = models.ImageField(upload_to='receipts/')
    merchant_name = models.CharField(max_length=255)
    date = models.DateField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.merchant_name} - {self.total}"