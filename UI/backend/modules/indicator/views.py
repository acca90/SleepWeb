"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import viewsets
from backend.commons.IsSuperUserPermission import IsSuperUserPermission
from backend.modules.indicator.serializers import IndicatorSerializer
from backend.modules.indicator.models import Indicator


class IndicatorViewSet(viewsets.ModelViewSet):
    serializer_class = IndicatorSerializer
    permission_classes = (IsSuperUserPermission,)

    def get_queryset(self):

        identification = self.request.query_params.get('pk', None)
        if identification is not None:
            self.pagination_class = None
            return Indicator.objects.filter(pk=identification)

        return Indicator.objects.all().order_by('id')
