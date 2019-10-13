"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers

from backend.modules.rule.models import Rule, Threshold
from backend.modules.stage.serializers import StageSerializer
from backend.modules.user.serializers import UserReadSerializer


class ThresholdWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Threshold
        fields = (
            'id',
            'indicator',
            'stage',
            'begin',
            'end',
            'quality',
            'weight',
        )


class ThresholdReadSerializer(serializers.ModelSerializer):

    stage = StageSerializer(read_only=True)

    class Meta:
        model = Threshold
        fields = (
            'id',
            'indicator',
            'stage',
            'begin',
            'end',
            'quality',
            'weight',
            'stage'
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

    thresholds = ThresholdReadSerializer(many=True)

    class Meta:
        model = Rule
        fields = (
            'id',
            'description',
            'user',
            'thresholds'
        )


class RuleWriteSerializer(WritableNestedModelSerializer):
    """
    Serializer defined to write operations
    """
    thresholds = ThresholdWriteSerializer(many=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Rule
        fields = (
            'id',
            'description',
            'user',
            'thresholds'
        )
