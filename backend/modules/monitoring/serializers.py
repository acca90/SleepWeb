"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 15/06/2019
"""
from rest_framework import serializers

from backend.modules.indicator.serializers import IndicatorSerializer
from backend.modules.patient.serializers import PatientMinimalSerializer
from backend.modules.monitoring.models import Monitoring, MonitoringIndicator


class MonitoringIndicatorSerializer(serializers.ModelSerializer):

    indicator = IndicatorSerializer(read_only=True)

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
    patient = PatientMinimalSerializer(read_only=True)

    class Meta:
        model = Monitoring
        fields = (
            'id',
            'patient',
            'begin',
            'end',
        )
        datatables_always_serialize = (
            'id',
            'patient',
            'begin',
            'end',
        )


class MonitoringReadSerializer(serializers.ModelSerializer):
    """
    Serializer for readonly monitoring list
    """
    patient = PatientMinimalSerializer(read_only=True)
    indicators = MonitoringIndicatorSerializer(read_only=True, many=True)

    class Meta:
        model = Monitoring
        fields = (
            'id',
            'begin',
            'end',
            'patient',
            'indicators'
        )
