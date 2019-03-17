"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""
from rest_framework.permissions import BasePermission


class IsSuperUserPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser
