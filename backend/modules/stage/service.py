"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 15/12/2019
"""
from datetime import date

from backend.commons.AgeGroupByDaysOfLife import get_age_group_by_days_of_life
from backend.modules.patient.models import Patient
from backend.modules.stage.models import Stage


class StageService:
    """
    Class defined to keep stage classification of patients
    """
    def rank_by_id(self, patient_id):
        """
        Method defined to rank patients stage by ID
        """
        birth_date = Patient.objects.get(pk=patient_id).values('birth_date')
        delta = date.today() - birth_date
        return self.apply_stage(delta.days, patient_id)

    def rank_by_object(self, patient):
        """
        Method defined to rank patients by object
        """
        delta = date.today() - patient.birth_date
        return self.apply_stage(delta.days, patient.id)

    def apply_stage(self, days, patient_id):
        """
        Return stage
        """
        stage = Stage.objects.get(pk=get_age_group_by_days_of_life(days))
        Patient.objects.filter(pk=patient_id).update(stage=stage)
