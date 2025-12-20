from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # This list shows these columns in the dashboard
    list_display = ('name', 'price', 'category', 'brand')
    # This adds a search bar
    search_fields = ('name', 'category')