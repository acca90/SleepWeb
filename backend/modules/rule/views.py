"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Rule
from .serializers import RuleReadSerializer


class RuleViewSet(viewsets.ModelViewSet):
    serializer_class = RuleReadSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Rule.objects.all()

    def list(self, request, *args, **kwargs):
        """
        Method for list groups
        """
        if not request.user.is_superuser:
            self.queryset = Rule.objects.filter(user__pk=request.user.id)

        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Method for retrieve a single rule
        """
        queryset = Rule.objects.get(pk=request.GET['pk'])
        serializer = RuleReadSerializer(queryset, many=False)
        return Response(serializer.data)
