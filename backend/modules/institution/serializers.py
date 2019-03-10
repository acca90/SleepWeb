"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""
from rest_framework import serializers
from .models import Institution


class InstitutionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Institution
        fields = '__all__'
        datatables_always_serialize = ('id', 'name', 'country')
