"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2019
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from commons.notAllowed import not_allowed_to_do
from .serializers import StageSerializer
from .models import Stage


class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Stage.objects.all()

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

    def create(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        return super().create(request, args, kwargs)

    def partial_update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        return super().partial_update(request, args, kwargs)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        return super().destroy(request, args, kwargs)
