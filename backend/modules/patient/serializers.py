"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2018
"""
from rest_framework import serializers

from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        datatables_always_serialize = (
            'id',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'stage',
            'user',
        )
