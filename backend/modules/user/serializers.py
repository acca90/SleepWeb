"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 11/03/2019
"""
from rest_framework import serializers
from backend.modules.user.models import User
from backend.modules.institution.serializers import InstitutionSerializer
from backend.modules.institution.models import Institution


class UserWriteSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'request' in self.context and self.context['request'].method == 'GET':
            self.fields['institution'] = InstitutionSerializer()
        else:
            self.fields['institution'] = serializers.PrimaryKeyRelatedField(queryset=Institution.objects.all())

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'is_active',
            'institution',
        )
        datatables_always_serialize = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'institution',
        )


class UserReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'institution',
        )
