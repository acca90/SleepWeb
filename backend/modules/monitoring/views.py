"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 30/05/2019
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from backend.modules.monitoring.models import Monitoring
from backend.modules.monitoring.serializers import MonitoringReadSerializer


class MonitoringReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing accounts.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringReadSerializer

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        return super().retrieve(request, args, kwargs)
