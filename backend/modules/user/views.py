"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.hashers import make_password

from backend.modules.user.models import User
from backend.modules.user.serializers import UserSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):

        identification = self.request.query_params.get('pk', None)
        if identification is not None:
            self.pagination_class = None
            return User.objects.filter(pk=identification)

        return User.objects.select_related().order_by('id')

    def get_permissions(self):
        if self.action in ('create',):
            self.permission_classes = [AllowAny, ]
        return super(self.__class__, self).get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.data['id'])
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():

            if 'password' in serializer.validated_data:
                serializer.validated_data['password'] = make_password(serializer.validated_data['password'])

            serializer.update(user, serializer.validated_data)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)
