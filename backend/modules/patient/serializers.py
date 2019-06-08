"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2019
"""
from rest_framework import serializers

from backend.modules.stage.serializers import StageSerializer
from backend.modules.user.serializers import UserReadSerializer
from backend.modules.user.models import User
from .models import Patient


class PatientWriteSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        required=False
    )

    def create(self, validated_data):
        return Patient.objects.create(**validated_data)

    class Meta:
        model = Patient
        fields = '__all__'
        datatables_always_serialize = (
            'id',
            'uuid',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'user',
        )


class PatientReadSerializer(serializers.ModelSerializer):
    users = UserReadSerializer(read_only=True)
    stage = StageSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = '__all__'
        datatables_always_serialize = (
            'id',
            'uuid',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'stage',
            'user',
        )
