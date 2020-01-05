"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 14/12/2019
"""
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from backend.commons.notAllowed import not_allowed_to_do, not_allowed_to_see
from backend.commons.utils import check_owner
from backend.modules.period.models import Period
from backend.modules.period.serializers import PeriodReadSerializer, PeriodWriteSerializer


class PeriodViewSet(viewsets.ModelViewSet):
    serializer_class = PeriodReadSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Period.objects.all()

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            self.queryset = Period.objects.filter(user__pk=request.user.id)

        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        queryset = Period.objects.get(pk=request.GET['pk'])
        serializer = PeriodReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        serializer = PeriodWriteSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.validated_data['user'] = self.request.user
            instance = serializer.create(serializer.validated_data)
            read_serializer = PeriodReadSerializer(instance)
            return Response(read_serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Period.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        serializer = PeriodWriteSerializer(
            partial=True,
            data=request.data,
            instance=instance,
            context={"request": request}
        )
        if serializer.is_valid():
            instance = serializer.update(instance, serializer.validated_data)
            read_serializer = PeriodReadSerializer(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Period.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Period.objects.get(pk=kwargs['pk'])

        if request.user.is_superuser:
            return super().destroy(request, args, kwargs)

        if instance.user.id == request.user.id:
            return super().destroy(request, args, kwargs)

        return not_allowed_to_do()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def period_analyze(request, period_id):
    period = Period.objects.get(pk=period_id)
    if not check_owner(request.user, period.user):
        return not_allowed_to_see()

    response = {
        "begin": period.begin,
        "end": period.end,
        "data": None
    }

    return response
