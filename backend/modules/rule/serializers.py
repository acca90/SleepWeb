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


class ThresholdReadSerializer(serializers.ModelSerializer):
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


class RuleListSerializer(serializers.ModelSerializer):

    user = UserReadSerializer(read_only=True)

    class Meta:
        model = Rule
        fields = (
            'id',
            'description',
            'user',
        )
        datatables_always_serialize = fields


class RuleReadSerializer(serializers.ModelSerializer):

    thresholds = ThresholdWriteSerializer(many=True)

    class Meta:
        model = Rule
        fields = (
            'id',
            'description',
            'user',
            'thresholds'
        )


class RuleWriteSerializer(serializers.ModelSerializer):
    """
    Serializer defined to write operations
    """
    thresholds = ThresholdWriteSerializer(many=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def create(self, validated_data):
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
            'user',
            'thresholds'
        )
        datatables_always_serialize = (
            'id',
            'description',
        )
