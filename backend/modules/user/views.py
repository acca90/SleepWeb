"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.hashers import make_password

from backend.commons.IsSuperUserPermission import IsSuperUserPermission
from backend.modules.user.models import User
from backend.modules.user.serializers import UserSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsSuperUserPermission,)

    def list(self, request, **kwargs):
        params = Q()
        if 'search[value]' in request.GET and request.GET['search[value]'] != '':
            params = Q(username__icontains=request.GET['search[value]']) |\
                     Q(first_name__icontains=request.GET['search[value]']) |\
                     Q(last_name__icontains=request.GET['search[value]']) |\
                     Q(email__icontains=request.GET['search[value]']) |\
                     Q(institution__name__icontains=request.GET['search[value]'])

        queryset = User.objects.filter(params).select_related().order_by('id')
        serializer = self.serializer_class(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        queryset = User.objects.get(pk=request.GET['pk'])
        serializer = UserSerializer(queryset, many=False, context={"request": request})
        return Response(serializer.data)

    def get_permissions(self):
        if self.action in ('create',):
            self.permission_classes = [AllowAny, ]
        return super(self.__class__, self).get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.data['id'])
        serializer = UserSerializer(
            instance=user, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():

            if 'password' in serializer.validated_data:
                serializer.validated_data['password'] = make_password(serializer.validated_data['password'])

            serializer.update(user, serializer.validated_data)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)


