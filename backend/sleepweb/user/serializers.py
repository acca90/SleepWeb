from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    institution_name = serializers.ReadOnlyField(source='institution.name')

    class Meta:
        model = User
        fields = '__all__'
