"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2019
"""
from rest_framework import serializers
from backend.modules.institution.serializers import InstitutionSerializer
from backend.modules.stage.serializers import StageSerializer
from backend.modules.user.serializers import UserReadSerializer
from backend.modules.user.models import User
from backend.modules.institution.models import Institution
from backend.modules.patient.models import Patient


class PatientWriteSerializer(serializers.ModelSerializer):
    """
     Serializer defined to write operations
    """
    institutions = serializers.PrimaryKeyRelatedField(
        queryset=Institution.objects.all(),
        many=True,
        required=False
    )

    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False
    )

    def create(self, validated_data):
        return super().create(validated_data)

    class Meta:
        model = Patient
        fields = (
            'id',
            'uuid',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'institutions',
            'user',
        )
        datatables_always_serialize = (
            'id',
            'uuid',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'institutions',
            'user',
        )
        extra_kwargs = {
            'obs': {
                'required': False,
                'allow_blank': True,
            },
        }


class PatientReadSerializer(serializers.ModelSerializer):
    """
     Serializer defined to read operations
    """
    user = UserReadSerializer(read_only=True)
    stage = StageSerializer(read_only=True)
    institutions = InstitutionSerializer(many=True)

    class Meta:
        model = Patient
        fields = (
            'id',
            'uuid',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'stage',
            'institutions',
            'user',
        )
        datatables_always_serialize = (
            'id',
            'uuid',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'stage',
            'institutions',
            'user',
        )


class PatientMinimalSerializer(serializers.ModelSerializer):
    """
     Serializer defined to read operations
    """
    stage = StageSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = (
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'stage',
        )
        datatables_always_serialize = (
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'obs',
            'stage',
        )
