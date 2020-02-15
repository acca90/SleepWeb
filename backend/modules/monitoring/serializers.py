"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 15/06/2019
"""
from rest_framework import serializers

from backend.modules.indicator.serializers import IndicatorMinimalSerializer
from backend.modules.patient.serializers import PatientRemoteReferenceViewSerializer
from backend.modules.patient.serializers import PatientRemoteReferenceEvaluateSerializer
from backend.modules.monitoring.models import Monitoring, MonitoringIndicator


class MonitoringIndicatorSerializer(serializers.ModelSerializer):

    indicator = IndicatorMinimalSerializer(read_only=True)

    class Meta:
        model = MonitoringIndicator
        fields = (
            'indicator',
            'value'
        )


class MonitoringListSerializer(serializers.ModelSerializer):
    """
    Serializer for readonly monitoring list
    """
    reference = PatientRemoteReferenceViewSerializer(read_only=True)

    class Meta:
        model = Monitoring
        fields = (
            'id',
            'reference',
            'begin',
            'end',
        )
        datatables_always_serialize = (
            'id',
            'reference',
            'begin',
            'end',
        )


class MonitoringReadSerializer(serializers.ModelSerializer):
    """
    Serializer for readonly monitoring list
    """
    reference = PatientRemoteReferenceEvaluateSerializer(read_only=True)
    indicators = MonitoringIndicatorSerializer(read_only=True, many=True)

    class Meta:
        model = Monitoring
        fields = (
            'id',
            'begin',
            'end',
            'reference',
            'indicators'
        )
