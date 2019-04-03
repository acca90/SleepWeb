"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.hashers import make_password

from backend.commons.IsSuperUserPermission import IsSuperUserPermission
from backend.modules.user.models import User
from backend.modules.user.serializers import UserWriteSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserWriteSerializer
    permission_classes = (IsSuperUserPermission,)
    queryset = User.objects.all()

    def get_permissions(self):
        if self.action in ('create',):
            self.permission_classes = [AllowAny, ]
        return super(self.__class__, self).get_permissions()

    def retrieve(self, request, *args, **kwargs):
        queryset = User.objects.get(pk=request.GET['pk'])
        serializer = UserWriteSerializer(queryset, many=False, context={"request": request})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = UserWriteSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            serializer.data['id'] = user.id
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.data['id'])
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


