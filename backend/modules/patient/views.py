"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2019
"""
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.commons.notAllowed import not_allowed_to_do
from .models import Patient
from .serializers import PatientWriteSerializer, PatientReadSerializer


class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientReadSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Patient.objects.all()

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            self.queryset = Patient.objects.filter(user__pk=request.user.id)

        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        queryset = Patient.objects.get(pk=request.GET['pk'])
        serializer = PatientReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        serializer = PatientWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = self.request.user
            instance = serializer.create(serializer.validated_data)
            read_serializer = PatientReadSerializer(instance)
            return Response(read_serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Patient.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        serializer = PatientWriteSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.update(instance, serializer.validated_data)
            read_serializer = PatientReadSerializer(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Patient.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Patient.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().destroy(request, args, kwargs)
