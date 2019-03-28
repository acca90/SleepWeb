"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 27/03/2019
"""
from rest_framework import serializers
from backend.modules.group.models import Group

from backend.modules.user.models import User
from backend.modules.institution.models import Institution


class GroupSerializer(serializers.ModelSerializer):

    owner = serializers.SlugRelatedField(read_only=True, slug_field='first_name')
    institutions = serializers.PrimaryKeyRelatedField(queryset=Institution.objects.all(), many=True)
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = Group
        fields = (
            'id',
            'name',
            'details',
            'owner',
            'institutions',
            'users',
        )
        datatables_always_serialize = (
            'id',
            'name',
            'details',
            'owner',
        )
