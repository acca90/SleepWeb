"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 30/05/2019
"""
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from backend.commons.notAllowed import not_allowed_to_do
from backend.modules.monitoring.models import Monitoring
from backend.modules.monitoring.serializers import MonitoringReadSerializer
from backend.modules.monitoring.service import MonitoringService


class MonitoringReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ReadOnly ViewSet for monitorings.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringReadSerializer
    monitoring_service = MonitoringService()

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        self.queryset = self.monitoring_service.filter(request)
        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        queryset = self.monitoring_service.filter(request)
        serializer = MonitoringReadSerializer(queryset, many=False)
        return Response(serializer.data)


class MonitoringDashboardViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Dashboard ViewSet for monitorings.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringReadSerializer
    monitoring_service = MonitoringService()

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        self.queryset = self.monitoring_service.filter(request, 10)
        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        return not_allowed_to_do()

