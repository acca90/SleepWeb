"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 30/05/2019
"""
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from backend.commons.notAllowed import not_allowed_to_do
from backend.modules.monitoring.models import Monitoring
from backend.modules.monitoring.serializers import MonitoringListSerializer,  MonitoringReadSerializer
from backend.modules.monitoring.service import MonitoringService


class MonitoringDashboardViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Dashboard ViewSet for monitorings.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringListSerializer
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


class MonitoringReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ReadOnly ViewSet for monitorings.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringListSerializer
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
        self.serializer_class = MonitoringReadSerializer
        self.queryset = Monitoring.objects.all()
        return super().retrieve(request, args, kwargs)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def monitoring_sync(request):
    """
    API defined to evaluate monitorings
    """
    try:
        data = MonitoringService().fetch_dynamic(request)
        return Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(data={}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
