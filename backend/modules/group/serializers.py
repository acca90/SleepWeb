"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 27/03/2019
"""
from rest_framework import serializers
from backend.modules.group.models import Group

from backend.modules.patient.models import Patient
from backend.modules.user.models import User
from backend.modules.institution.models import Institution
from backend.modules.institution.serializers import InstitutionSerializer
from backend.modules.patient.serializers import PatientSerializer
from backend.modules.user.serializers import UserSmallSerializer


class GroupSerializer(serializers.ModelSerializer):

    owner = serializers.SlugRelatedField(read_only=True, slug_field='first_name')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'request' in self.context and self.context['request'].method == 'GET':
            self.fields['institutions'] = InstitutionSerializer(many=True)
            self.fields['users'] = UserSmallSerializer(many=True)
            self.fields['patients'] = PatientSerializer(many=True)
        else:
            self.fields['institutions'] = serializers.PrimaryKeyRelatedField(queryset=Institution.objects.all(), many=True)
            self.fields['users'] = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
            self.fields['patients'] = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all(), many=True)

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = Group
        fields = (
            'id',
            'name',
            'details',
            'owner',
            'institutions',
            'users',
            'patients',
        )
        datatables_always_serialize = (
            'id',
            'name',
            'details',
            'owner',
        )
