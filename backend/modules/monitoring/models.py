"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 30/05/2019
"""
import uuid
import dateutil.parser
from django.db import models

from backend.modules.indicator.models import Indicator
from backend.modules.msystem.models import MSystem
from backend.modules.patient.models import Patient


class Monitoring(models.Model):
    """
    The Monitoring model is used to store external módules response
    It referes to patient and window of time that monitoring happened
    """
    uuid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    patient = models.ForeignKey(Patient, on_delete=None, null=True)
    system = models.ForeignKey(MSystem, on_delete=None, null=True)
    begin = models.DateTimeField()
    end = models.DateTimeField()

    class Meta:
        db_table = 'Monitoring'
        managed = True
        verbose_name = 'Monitorings'
        verbose_name_plural = 'Monitorings'
        ordering = ['id']

    def copy(self, monitoring):
        """
        Copy json data to a new Monitoring instance
        """
        self.uuid = monitoring['uuid']
        self.patient = Patient.objects.get(uuid=monitoring['patient'])
        self.system = MSystem.objects.get(pk=monitoring['system'])
        self.begin = dateutil.parser.parse(monitoring['begin'])
        self.end = dateutil.parser.parse(monitoring['end'])
        return self

    def exists(self):
        """
        Check if monitoring exists
        """
        return Monitoring.objects.filter(uuid=self.uuid).count() != 0


class MonitoringIndicator(models.Model):
    """
    MonitoringIndicator is used to store collected indicadores
    """
    monitoring = models.ForeignKey(Monitoring, related_name='indicators', on_delete=models.CASCADE)
    indicator = models.ForeignKey(Indicator, db_column='indicator', null=False, on_delete=models.CASCADE)
    value = models.DecimalField(db_column='value', null=False, decimal_places=2, max_digits=30)

    class Meta:
        db_table = 'Monitoring_Indicators'
        managed = True
        verbose_name = 'Monitoring Indicators'
        verbose_name_plural = 'Monitoring Indicators'
        ordering = ['id']

    def copy(self, indicator, monitoring):
        self.indicator = Indicator.objects.get(pk=indicator['indicator'])
        self.value = indicator['value']
        self.monitoring = monitoring
        return self
