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


class PatientService:
    """
    Service to keep logics and exposing methods for patients
    """

    @staticmethod
    def send(patient_pk):
        """
        Method defined to send patient for its institutions
        """
        try:
            # Patient
            serialized = serializers.serialize(
                "json",
                Patient.objects.filter(pk=patient_pk),
                fields=('uuid', 'first_name', 'last_name', 'birth_date', 'gender')
            )

            # Instances to send patient
            msystems = MSystem.objects.filter(
                institution_id__in=Institution.objects.filter(patient_institution__id=patient_pk).values('pk')
            )

            # Send patient for each instance
            for location in msystems:
                response = requests.post(location.url + 'patient', json=json.loads(serialized)[0]['fields'])
                if response.status_code != 200:
                    raise Exception(response.status_code)

        except Exception as e:
            print(e)
            raise Exception(status.HTTP_500_INTERNAL_SERVER_ERROR)
