"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import serializers
from .models import Indicator


class IndicatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicator
        fields = '__all__'
        datatables_always_serialize = '__all__'


class IndicatorMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicator
        fields = ('id', 'description')

