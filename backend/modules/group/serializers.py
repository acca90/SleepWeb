"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 27/03/2019
"""
from rest_framework import serializers
from backend.modules.group.models import Group

from backend.modules.institution.serializers import InstitutionSerializer
from backend.modules.patient.serializers import PatientReadSerializer
from backend.modules.user.serializers import UserReadSerializer
from backend.modules.patient.models import Patient
from backend.modules.user.models import User
from backend.modules.institution.models import Institution


class GroupWriteSerializer(serializers.ModelSerializer):
    """
     Serializer defined to write operations
    """
    institutions = serializers.PrimaryKeyRelatedField(
        queryset=Institution.objects.all(),
        many=True,
        required=False
    )

    users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        required=False
    )

    patients = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(),
        many=True,
        required=False
    )

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = Group
        fields = (
            'id',
            'name',
            'details',
            'institutions.json',
            'users',
            'patients',
        )


class GroupReadSerializer(serializers.ModelSerializer):
    """
     Serializer defined to read operations
    """
    owner = serializers.SlugRelatedField(read_only=True, slug_field='first_name')
    institutions = InstitutionSerializer(many=True)
    users = UserReadSerializer(many=True)
    patients = PatientReadSerializer(many=True)

    class Meta:
        model = Group
        fields = (
            'id',
            'name',
            'details',
            'owner',
            'institutions.json',
            'users',
            'patients',
        )
        datatables_always_serialize = (
            'id',
            'name',
            'details',
            'owner',
        )
