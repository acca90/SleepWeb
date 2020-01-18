"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2019
"""
import uuid
from django.db import models
from backend.modules.institution.models import Institution
from backend.modules.msystem.models import MSystem
from backend.modules.stage.models import Stage
from backend.modules.user.models import User


class Patient(models.Model):
    first_name = models.CharField(db_column='first_name', max_length=255, null=False)
    last_name = models.CharField(db_column='last_name', max_length=255, null=False)
    birth_date = models.DateField(db_column='birth_date', null=False)
    gender = models.IntegerField(db_column='gender', null=False)
    obs = models.CharField(db_column='obs', max_length=3000, null=True)

    stage = models.ForeignKey(Stage, on_delete=None, null=True)
    user = models.ForeignKey(User, on_delete=None, null=True)
    institutions = models.ManyToManyField(Institution, related_name='patient_institution')

    class Meta:
        db_table = 'Patient'
        managed = True
        verbose_name = 'Patients'
        verbose_name_plural = 'Patients'
        ordering = ['id']

    def __str__(self):
        return self.first_name + " " + self.last_name


class PatientRemoteReference(models.Model):
    """
    This model is defined keep reference for the patient in remote locations
    """
    patient = models.ForeignKey(Patient, on_delete=None, null=True)
    system = models.ForeignKey(MSystem, on_delete=None, null=True)
    uuid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    name = models.CharField(db_column='name', max_length=255, null=False)

    class Meta:
        db_table = 'PatientRemoteReference'
        managed = True
        verbose_name = 'Patiente Remote Reference'
        verbose_name_plural = 'Patiente Remote Reference'
        ordering = ['id']
