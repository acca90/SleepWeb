"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 02/09/2019
"""
import json
import requests
from django.core import serializers
from rest_framework import status
from backend.modules.institution.models import Institution
from backend.modules.msystem.models import MSystem
from backend.modules.patient.models import Patient
from backend.modules.patient.models import PatientRemoteReference


class PatientService:
    """
    Service to keep logics and exposing methods for patients
    """

    @staticmethod
    def send(patient_pk):
        # TODO REBUILD
        """
        Method defined to send patient for its institutions
        """
        try:
            # Patient
            serialized = serializers.serialize(
                "json",
                Patient.objects.filter(pk=patient_pk),
                fields=('first_name', 'last_name', 'birth_date', 'gender')
            )

            # Instances to send patient
            msystems = MSystem.objects.filter(
                institution_id__in=Institution.objects.filter(
                    patient_institution__id=patient_pk
                ).values('pk'),
                is_active=True
            )

            # Send patient for each instance
            for location in msystems:
                response = requests.post(location.url + 'patient', json=json.loads(serialized)[0]['fields'])
                if response.status_code != 200:
                    raise Exception(response.status_code)

        except Exception as e:
            print(e)
            raise Exception(status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def send_references(references):
        """
        Method defined to send patient references to its systems
        """
        for reference in references:
            system = MSystem.objects.get(pk=reference.system.id)
            json_reference = serializers.serialize(
                "json",
                reference,
                fields=('uuid', 'name')
            )
            response = requests.post(
                url=system.url + 'patient',
                json=json.loads(json_reference)[0]['fields']
            )
            if response.status_code != 200:
                raise Exception(response.status_code)

    @staticmethod
    def generate_reference(patient):
        """
        Method defined to generate references for all related systems
        """
        references = []
        try:
            systems = MSystem.objects.filter(
                institution_id__in=Patient.objects.get(pk=patient.id).institutions.filter().values('pk')
            )
            for system in systems:
                reference = PatientRemoteReference()
                reference.patient = patient
                reference.system = system
                reference.name = patient.first_name + " " + patient.last_name
                reference.save()
                references.append(reference)
        except Exception as e:
            print(e)
            return None
        return references


