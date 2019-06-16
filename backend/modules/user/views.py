"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.hashers import make_password

from backend.modules.user.models import User
from backend.modules.user.serializers import UserWriteSerializer
from backend.commons.notAllowed import not_allowed_to_do


class UserViewSet(ModelViewSet):
    serializer_class = UserWriteSerializer
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        queryset = User.objects.get(pk=request.GET['pk'])
        serializer = UserWriteSerializer(
            queryset,
            many=False,
            context={"request": request}
        )
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        serializer = UserWriteSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            serializer.data['id'] = user.id
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        """
         Method for update users
         """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        user = User.objects.get(pk=kwargs['pk'])
        serializer = UserWriteSerializer(
            instance=user, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():

            if 'password' in serializer.validated_data:
                serializer.validated_data['password'] = make_password(serializer.validated_data['password'])

            serializer.update(user, serializer.validated_data)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            return not_allowed_to_do()

        return super().destroy(request, args, kwargs)
