"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2019
"""
from django.db import models
import uuid

from backend.modules.stage.models import Stage
from backend.modules.user.models import User


class Patient(models.Model):
    uuid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    first_name = models.CharField(db_column='first_name', max_length=255, null=False)
    last_name = models.CharField(db_column='last_name', max_length=255, null=False)
    birth_date = models.DateField(db_column='brith_date', null=False)
    gender = models.IntegerField(db_column='gender', null=False)
    obs = models.CharField(db_column='obs', max_length=3000, null=True)

    stage = models.ForeignKey(Stage, on_delete=None, null=True)
    user = models.ForeignKey(User, on_delete=None, null=True)

    class Meta:
        db_table = 'Patient'
        managed = True
        verbose_name = 'Patients'
        verbose_name_plural = 'Patients'
        ordering = ['id']

    def __str__(self):
        return self.first_name + " " + self.last_name
