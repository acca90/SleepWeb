"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 14/12/2019
"""
from django.db import models

from backend.modules.msystem.models import MSystem
from backend.modules.patient.models import Patient
from backend.modules.rule.models import Rule
from backend.modules.user.models import User


class Period(models.Model):
    """
    Model defined to set a monitoring period starting and ending on specific dates
    """
    user = models.ForeignKey(User, db_column='user', on_delete=None, null=True)
    patient = models.ForeignKey(Patient, on_delete=None, null=True)
    system = models.ForeignKey(MSystem, on_delete=None, null=True)
    begin = models.DateField(db_column='begin', null=False)
    end = models.DateField(db_column='end', null=False)
    rule = models.ForeignKey(Rule, db_column='rule', on_delete=None, null=True)

    class Meta:
        db_table = 'Period'
        managed = True
        verbose_name = 'periods'
        verbose_name_plural = 'periods'
        ordering = ['id']
