"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2019
"""
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from backend.commons.notAllowed import not_allowed_to_do
from backend.modules.monitoring.models import Monitoring
from backend.modules.patient.models import Patient, PatientRemoteReference
from backend.modules.patient.serializers import PatientWriteSerializer, PatientReadSerializer, \
    PatientRemoteReferenceSerializer
from backend.modules.patient.service import PatientService
from backend.modules.stage.service import StageService


def delete_references(instance):
    """
    Method defined to clean remote references for patients
    """
    references = PatientRemoteReference.objects.filter(patient_id=instance.id)
    if Monitoring.objects.filter(reference__in=references).count() > 0:
        return False

    references.delete()
    return True


class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientReadSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Patient.objects.all()
    stage_service = StageService()
    patient_service = PatientService()

    def list(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        if not request.user.is_superuser:
            self.queryset = Patient.objects.filter(user__pk=request.user.id)

        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        queryset = Patient.objects.get(pk=request.GET['pk'])
        serializer = PatientReadSerializer(queryset, many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        serializer = PatientWriteSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.validated_data['user'] = self.request.user
            instance = serializer.create(serializer.validated_data)
            self.stage_service.rank_by_object(instance)
            read_serializer = PatientReadSerializer(instance)

            try:
                references = self.patient_service.generate_reference(instance)
                if len(references) > 0:
                    self.patient_service.send(references)
            except Exception as e:
                print(e)

            return Response(read_serializer.data)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Patient.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        serializer = PatientWriteSerializer(
            partial=True,
            data=request.data,
            instance=instance,
            context={"request": request}
        )
        if serializer.is_valid():
            instance = serializer.update(instance, serializer.validated_data)
            read_serializer = PatientReadSerializer(instance)
            self.stage_service.rank_by_object(instance)
            return Response(read_serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Patient.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        return super().update(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override method to check permissions
        """
        instance = Patient.objects.get(pk=kwargs['pk'])

        if instance.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        if not delete_references(instance):
            return Response({
                "Forbidden": "Is not possible to delete this patient, "
                             "he or she is related with monitoring records"
            }, status.HTTP_401_UNAUTHORIZED)

        return super().destroy(request, args, kwargs)


class PatientRemoteReferenceViwerSet(mixins.CreateModelMixin,
                                     mixins.ListModelMixin,
                                     GenericViewSet):
    serializer_class = PatientRemoteReferenceSerializer
    queryset = PatientRemoteReference.objects.all()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def patient_send(request, pk):
    try:
        PatientService.send(pk)
        return Response(data={}, status=status.HTTP_200_OK)
    except Exception:
        return Response(data={}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
