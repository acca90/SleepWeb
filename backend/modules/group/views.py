"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Group
from .serializers import GroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()

    def get_permissions(self):
        if self.action in ('create',):
            self.permission_classes = [AllowAny, ]
        return super(self.__class__, self).get_permissions()

    '''
    Method for retrieve a single group
    '''
    def retrieve(self, request, *args, **kwargs):
        queryset = Group.objects.get(pk=request.GET['pk'])
        serializer = GroupSerializer(
            queryset,
            many=False,
            context={"request": request}
        )
        return Response(serializer.data)

    '''
    Method for create group
    def create(self, request, *args, **kwargs):
        serializer = GroupSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.validated_data['owner'] = self.request.user
            serializer.create(serializer.validated_data)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)
    '''
