from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    image_url = models.URLField(max_length=500)
    rating = models.FloatField(default=0.0)
    reviews_count = models.IntegerField(default=0)
    stock = models.IntegerField(default=10) # Added to track inventory
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name