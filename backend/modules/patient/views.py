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

from backend.commons.notAllowed import not_allowed_to_do, not_allowed_to_see
from backend.modules.monitoring.models import Monitoring
from backend.modules.msystem.models import MSystem
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


def exists_reference(param):
    """
    Method defined to verify if a reference is already stored
    """
    return PatientRemoteReference.objects.filter(uuid=param).count() > 0


def select_available_references(patientpk):
    """
    Method defined to list available references for patient
    """
    return PatientRemoteReference.objects.filter(
        system_id__in=MSystem.objects.filter(
            institution_id__in=Patient.objects.get(
                pk=patientpk
            ).institutions.filter().values('pk')
        ).values('id'),
        patient=None
    ).values('name', 'system__description', 'system__institution__name', 'uuid')


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
                                     mixins.RetrieveModelMixin,
                                     mixins.UpdateModelMixin,
                                     GenericViewSet):
    serializer_class = PatientRemoteReferenceSerializer
    queryset = PatientRemoteReference.objects.all()

    def retrieve(self, request, *args, **kwargs):
        """
        Override default retrieve method
        """
        if request.user.id is None:
            return not_allowed_to_see()
        try:
            return Response(select_available_references(kwargs['pk']))
        except Exception as e:
            print(e)
            return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if 'origin' not in request.POST:
            return Response(data={}, status=status.HTTP_400_BAD_REQUEST)

        systems = MSystem.objects.filter(url__contains=request.POST['origin'])
        if len(systems) == 0:
            return Response(data={}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PatientRemoteReferenceSerializer(data=request.data, context={"request": request})
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

        if exists_reference(request.POST['uuid']):
            return Response(serializer.data, status.HTTP_200_OK)

        system = systems[0]
        serializer.validated_data['uuid'] = request.POST['uuid']
        serializer.validated_data['system'] = system
        serializer.create(serializer.validated_data)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """
        Update method is completed changed, allowing to link patient references to Patients
        """
        references = request.data.getlist('references[]')
        if len(references) < 1:
            return Response(data={}, status=status.HTTP_400_BAD_REQUEST)

        available_references = select_available_references(kwargs['pk'])

        found = False
        for reference in available_references:
            if str(reference['uuid']) in references:
                found = True
                break

        if not found:
            return Response(data={}, status=status.HTTP_400_BAD_REQUEST)

        patient = Patient.objects.get(pk=kwargs['pk'])
        if patient.user.id != request.user.id and not request.user.is_superuser:
            return not_allowed_to_do()

        PatientRemoteReference.objects.filter(
            uuid__in=references,
            patient__isnull=True
        ).update(patient=patient)

        return Response(data={}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def patient_send(request, pk):
    try:
        PatientService.send(pk)
        return Response(data={}, status=status.HTTP_200_OK)
    except Exception:
        return Response(data={}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
