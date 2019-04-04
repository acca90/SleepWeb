"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import viewsets
from backend.commons.IsSuperUserPermission import IsSuperUserPermission
from backend.modules.msystem.serializers import MSystemSerializer
from backend.modules.msystem.models import MSystem


class MSystemViewSet(viewsets.ModelViewSet):
    serializer_class = MSystemSerializer
    permission_classes = (IsSuperUserPermission,)

    def get_queryset(self):

        identification = self.request.query_params.get('pk', None)
        if identification is not None:
            self.pagination_class = None
            return MSystem.objects.filter(pk=identification)

        return MSystem.objects.all().order_by('id')
