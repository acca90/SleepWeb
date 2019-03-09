"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""

from rest_framework import viewsets
from .models import Institution
from .serializers import InstitutionSerializer


class InstitutionViewSet(viewsets.ModelViewSet):
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
