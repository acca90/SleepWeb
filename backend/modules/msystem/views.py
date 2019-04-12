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
    queryset = MSystem.objects.all()

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
