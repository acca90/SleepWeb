"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 14/12/2019
"""
from rest_framework import serializers

from backend.modules.patient.models import Patient
from backend.modules.patient.serializers import PatientMinimalSerializer
from backend.modules.period.models import Period
from backend.modules.rule.models import Rule
from backend.modules.rule.serializers import RuleMinimalSerializer
from backend.modules.user.serializers import UserReadSerializer


class PeriodReadSerializer(serializers.ModelSerializer):
    """
    Serializer for read operations
    """
    patient = PatientMinimalSerializer(read_only=True)
    rule = RuleMinimalSerializer(read_only=True)

    class Meta:
        model = Period
        fields = (
            'id',
            'begin',
            'end',
            'patient',
            'rule'
        )
        datatables_always_serialize = (
            'id',
            'begin',
            'end',
            'patient',
            'rule'
        )


class PeriodWriteSerializer(serializers.ModelSerializer):
    """
    Serializer for write operations
    """
    patient = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(),
        required=False
    )
    rule = serializers.PrimaryKeyRelatedField(
        queryset=Rule.objects.all(),
        required=False
    )
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Period
        fields = (
            'id',
            'begin',
            'end',
            'rule',
            'user',
            'patient'
        )
