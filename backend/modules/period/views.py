"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 14/12/2019
"""
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from backend.commons.notAllowed import not_allowed_to_do
from backend.modules.period.models import Period
from backend.modules.period.serializers import PeriodReadSerializer, PeriodWriteSerializer


class PeriodViewSet(viewsets.ModelViewSet):
    serializer_class = PeriodReadSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Period.objects.all()

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            self.queryset = Period.objects.filter(user__pk=request.user.id)

        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        queryset = Period.objects.get(pk=request.GET['pk'])
        serializer = PeriodReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        serializer = PeriodWriteSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            instance = serializer.create(serializer.validated_data)
            read_serializer = PeriodReadSerializer(instance)
            return Response(read_serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Period.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        serializer = PeriodWriteSerializer(
            partial=True,
            data=request.data,
            instance=instance,
            context={"request": request}
        )
        if serializer.is_valid():
            instance = serializer.update(instance, serializer.validated_data)
            read_serializer = PeriodReadSerializer(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Period.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Period.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().destroy(request, args, kwargs)

