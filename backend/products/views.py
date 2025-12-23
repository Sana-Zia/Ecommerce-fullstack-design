from rest_framework import viewsets
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Start with all products
        queryset = Product.objects.all()
        
        # Capture parameters from the React frontend
        search_query = self.request.query_params.get('search', '').strip()
        category_query = self.request.query_params.get('category', '').strip()

        # Apply search filter
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(description__icontains=search_query)
            )

        # Apply category filter (ignoring 'All categories')
        if category_query and category_query.lower() != 'all categories':
            queryset = queryset.filter(category__icontains=category_query)

        return queryset.distinct()