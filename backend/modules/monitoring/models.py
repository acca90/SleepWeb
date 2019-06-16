"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 30/05/2019
"""
from django.db import models

# Create your models here.
from backend.modules.patient.models import Patient


class Monitoring(models.Model):
    """
    The Monitoring model is used to store external módules response
    It referes to patient and window of time that monitoring happened
    """
    patient = models.ForeignKey(Patient, on_delete=None, null=True)
    begin = models.DateTimeField()
    end = models.DateTimeField()


class MonitoringIndicator(models.Model):
    """
    MonitoringIndicator is used to store collected indicadores
    """
    monitoring = models.ForeignKey(Monitoring, on_delete=models.CASCADE)
    indicator = models.IntegerField(db_column='indicator', null=False)
    value = models.DecimalField(db_column='value', null=False, decimal_places=2, max_digits=30)
