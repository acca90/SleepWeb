"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import serializers

from .models import Rule


class RuleReadSerializer(serializers.ModelSerializer):
    """
    Serialzier for read-only operations
    """
    user = serializers.SlugRelatedField(read_only=True, slug_field='first_name')

    def create(self, validated_data):
        """
        Override default create
        """
        return Rule.objects.create(**validated_data)

    class Meta:
        model = Rule
        fields = '__all__'
        datatables_always_serialize = (
            'id',
            'description',
            'user',
        )
        datatables_always_serialize = (
            'id',
            'description',
            'user',
        )
