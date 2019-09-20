"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 15/06/2019
"""
from rest_framework import serializers
from backend.modules.patient.serializers import PatientMinimalSerializer
from backend.modules.monitoring.models import Monitoring


class MonitoringReadSerializer(serializers.ModelSerializer):
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
