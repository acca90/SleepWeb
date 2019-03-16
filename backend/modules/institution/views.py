"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Institution
from .serializers import InstitutionSerializer


class InstitutionViewSet(viewsets.ModelViewSet):
    serializer_class = InstitutionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):

        identification = self.request.query_params.get('pk', None)
        if identification is not None:
            self.pagination_class = None
            return Institution.objects.filter(pk=identification)

        return Institution.objects.all().order_by('id')

