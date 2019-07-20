"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import viewsets, status
from rest_framework.response import Response
from backend.commons.IsSuperUserPermission import IsSuperUserPermission
from backend.commons.utils import check_active
from backend.modules.msystem.models import MSystem
from backend.modules.msystem.serializers import MSystemReadSerializer, MSystemWriteSerializer


class MSystemViewSet(viewsets.ModelViewSet):
    serializer_class = MSystemReadSerializer
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
        queryset = MSystem.objects.get(pk=request.GET['pk'])
        serializer = MSystemReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        serializer = MSystemWriteSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.create(serializer.validated_data)
            read_serializer = MSystemReadSerializer(instance)
            return Response(read_serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = MSystem.objects.get(pk=kwargs['pk'])
        serializer = MSystemWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['is_active'] = check_active(serializer.validated_data)
            instance = serializer.update(instance, serializer.validated_data)
            read_serializer = MSystemReadSerializer(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        return super().destroy(request, args, kwargs)

