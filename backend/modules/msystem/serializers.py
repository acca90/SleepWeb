"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import serializers
from .models import MSystem


class MSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSystem
        fields = '__all__'
        datatables_always_serialize = ('id', 'name', 'url')
