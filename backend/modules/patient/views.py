"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2018
"""
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Patient
from .serializers import PatientSerializer


class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        kwargs = {}
        if not self.request.user.is_superuser:
            kwargs['user'] = self.request.user

        identification = self.request.query_params.get('pk', None)
        if identification is not None:
            self.pagination_class = None
            kwargs['pk'] = identification
            return Patient.objects.filter(**kwargs)

        return Patient.objects.filter(**kwargs).order_by('id')

    def get_permissions(self):
        if self.action in ('create',):
            self.permission_classes = [AllowAny, ]
        return super(self.__class__, self).get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = self.request.user
            patient = serializer.create(serializer.validated_data)
            serializer.validated_data['id'] = patient.id
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)
