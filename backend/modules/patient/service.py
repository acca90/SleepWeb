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
from backend.modules.msystem.models import MSystem
from backend.modules.patient.models import Patient
from backend.modules.patient.models import PatientRemoteReference


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
            references = PatientRemoteReference.objects.filter(patient_id=patient_pk)
            PatientService.send_references(references)
        except Exception as e:
            print(e)
            raise Exception(status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def send_references(references):
        """
        Method defined to send patient references to its systems
        """
        success = []
        fail = []
        try:
            for reference in references:
                system = MSystem.objects.get(pk=reference.system.id)
                if not system.is_active:
                    continue

                json_reference = serializers.serialize(
                    "json",
                    [reference],
                    fields=('uuid', 'name')
                )
                print("Requesting for", system.url + 'patient')
                response = requests.post(
                    url=system.url + 'patient',
                    json=json.loads(json_reference)[0]['fields']
                )
                if response.status_code != 200:
                    fail.append({
                        "system": system.description,
                        "status": "failed",
                        "code": response.status_code
                    })
                    continue

                success.append({
                    "system": system.description,
                    "status": "success",
                    "code": 200
                })

        except Exception as e:
            print(e)
            raise Exception(status.HTTP_500_INTERNAL_SERVER_ERROR)

        return {
            "success": success,
            "fail": fail
        }

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


