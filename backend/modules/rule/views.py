"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from backend.commons.notAllowed import not_allowed_to_do
from backend.modules.rule.models import Rule
from backend.modules.rule.serializers import RuleReadSerializer, RuleWriteSerializer


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
        Method for retrieve a single group
        """
        queryset = Rule.objects.get(pk=request.GET['pk'])
        serializer = RuleReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Method for create new groups
        """
        write_serializer = RuleWriteSerializer(data=request.data, context={"request": request})
        if write_serializer.is_valid():
            instance = write_serializer.create(write_serializer.validated_data)
            read_serializer = RuleReadSerializer(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(write_serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        """
        Method for update groups
        """
        instance = Rule.objects.get(pk=kwargs['pk'])

        if instance.user_id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        write_serializer = RuleWriteSerializer(
            partial=True,
            instance=instance,
            data=request.data,
            context={"request": request}
        )
        if write_serializer.is_valid():
            instance = write_serializer.update(instance, write_serializer.validated_data)
            read_serializer = RuleReadSerializer(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(write_serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Rule.objects.get(pk=kwargs['pk'])

        if instance.user_id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Rule.objects.get(pk=kwargs['pk'])

        if instance.user_id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().destroy(request, args, kwargs)

