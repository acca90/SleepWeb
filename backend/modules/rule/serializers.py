"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import serializers

from backend.modules.rule.models import Rule, Threshold
from backend.modules.user.serializers import UserReadSerializer


class ThresholdWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Threshold
        fields = (
            'indicator',
            'stage',
            'begin',
            'end',
            'quality',
            'weight',
        )


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
    thresholds = ThresholdWriteSerializer(many=True)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        threshold_data = validated_data.pop('thresholds')
        rule = Rule.objects.create(**validated_data)
        for threshold in threshold_data:
            Threshold.objects.create(rule=rule, **threshold)
        return rule

    class Meta:
        model = Rule
        fields = (
            'id',
            'description',
            'thresholds'
        )
        datatables_always_serialize = (
            'id',
            'description',
        )
