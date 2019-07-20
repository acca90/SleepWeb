"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import serializers
from backend.modules.institution.models import Institution
from backend.modules.institution.serializers import InstitutionSerializer
from backend.modules.msystem.models import MSystem


class MSystemWriteSerializer(serializers.ModelSerializer):

    institution = serializers.PrimaryKeyRelatedField(queryset=Institution.objects.all())

    class Meta:
        model = MSystem
        fields = '__all__'
        datatables_always_serialize = (
            'id',
            'name',
            'url',
            'institution',
            'is_active'
        )


class MSystemReadSerializer(serializers.ModelSerializer):

    institution = InstitutionSerializer()

    class Meta:
        model = MSystem
        fields = '__all__'
        datatables_always_serialize = (
            'id',
            'name',
            'url',
            'institution',
            'is_active'
        )



