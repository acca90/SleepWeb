"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Group
from .serializers import GroupReadSerializer, GroupWriteSerializer


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupReadSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()

    def retrieve(self, request, *args, **kwargs):
        """
        Method for retrieve a single group
        """
        queryset = Group.objects.get(pk=request.GET['pk'])
        serializer = GroupReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Method for create new groups
        """
        write_serializer = GroupWriteSerializer(data=request.data, context={"request": request})
        if write_serializer.is_valid():
            instance = write_serializer.create(write_serializer.validated_data)
            read_serializer = GroupReadSerializer(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(write_serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)
