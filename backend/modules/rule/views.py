"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from backend.commons.notAllowed import not_allowed_to_do
from backend.modules.rule.models import Rule
from backend.modules.rule.serializers import RuleListSerializer, RuleWriteSerializer, RuleReadSerializer
from backend.modules.rule.service import RuleService


class RuleViewSet(viewsets.ModelViewSet):
    serializer_class = RuleListSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Rule.objects.all()

    def list(self, request, *args, **kwargs):
        """
        Method for list groups
        """
        if not request.user.is_superuser:
            self.queryset = Rule.objects.filter(user__pk=request.user.id)

        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Method for retrieve a single group
        """
        queryset = Rule.objects.get(pk=request.GET['pk'])
        serializer = RuleReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Method for create new groups
        """
        self.serializer_class = RuleWriteSerializer
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        """
        Method for update groups
        """
        instance = Rule.objects.get(pk=kwargs['pk'])
        if instance.user_id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        self.serializer_class = RuleWriteSerializer
        return super().partial_update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if kwargs['partial']:
            instance = Rule.objects.get(pk=request.data['id'])
        else:
            instance = Rule.objects.get(pk=kwargs['pk'])

        if instance.user_id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Rule.objects.get(pk=kwargs['pk'])

        if instance.user_id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().destroy(request, args, kwargs)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def monitoring_evaluate(request, rule_id, monitoring_id):
    try:
        RuleService().evaluate(rule_id, monitoring_id)
        return Response(data={}, status=status.HTTP_200_OK)
    except Exception:
        return Response(data={}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
