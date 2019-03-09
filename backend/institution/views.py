from rest_framework import viewsets
from .models import Institution
from .serializers import InstitutionSerializer


class InstitutionViewSet(viewsets.ModelViewSet):
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
