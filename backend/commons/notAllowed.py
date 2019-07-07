"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 10/04/2019
"""
from rest_framework import status
from rest_framework.response import Response


def not_allowed_to_do():
    return Response({
        "Forbidden": "You are not allowed to do it"
    }, status.HTTP_403_FORBIDDEN)


def not_allowed_to_see():
    return Response({
        "Forbidden": "You are not allowed to see it"
    }, status.HTTP_403_FORBIDDEN)

