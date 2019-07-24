"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import serializers

from backend.modules.rule.models import Rule
from backend.modules.user.serializers import UserReadSerializer


class RuleReadSerializer(serializers.ModelSerializer):

    user = UserReadSerializer(read_only=True)

    def create(self, validated_data):
        """
        Override default create
        """
        return Rule.objects.create(**validated_data)

    class Meta:
        model = Rule
        fields = (
            'id',
            'description',
            'user',
        )
        datatables_always_serialize = (
            'id',
            'description',
            'user',
        )


class RuleWriteSerializer(serializers.ModelSerializer):
    """
    Serializer defined to write operations
    """
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = Rule
        fields = (
            'id',
            'description',
        )
        datatables_always_serialize = (
            'id',
            'description',
        )
