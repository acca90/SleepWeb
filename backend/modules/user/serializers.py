"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 11/03/2018
"""
from rest_framework import serializers
from backend.modules.user.models import User


class UserSerializer(serializers.ModelSerializer):

    institution_name = serializers.ReadOnlyField(source='institution.name')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'is_active',
            'institution',
            'institution_name'
        )
        datatables_always_serialize = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'institution',
            'institution_name'
        )
