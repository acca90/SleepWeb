"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from django.db import models
from backend.modules.user.models import User
from backend.modules.indicator.models import Indicator
from backend.modules.stage.models import Stage


class Rule(models.Model):
    """
    Model that combine an indicator and stage to represent a weight for evaluation
    """
    description = models.CharField(db_column='description', max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=None, null=False)

    class Meta:
        db_table = 'Rule'
        managed = True
        verbose_name = 'Rules'
        verbose_name_plural = 'Rules'
        ordering = ['id']


class Threshold(models.Model):
    """
    Model that define a threshold for a quality level
    this quality follows rules fo National Sleep Foundation
    example.:

    Sleep Eficienty:

    threshold 1 = quality=GOOD      top=100% bottom=85%
    threshold 2 = quality=UNCERTAIN top=85%  bottom=75%
    threshold 3 = quality=GOOD      top=75%  bottom=0%
    """
    rule = models.ForeignKey(Rule, related_name='thresholds', on_delete=models.CASCADE)
    indicator = models.ForeignKey(Indicator, on_delete=None, null=False)
    stage = models.ForeignKey(Stage, on_delete=None, null=False)
    # thresholds
    begin = models.IntegerField(db_column='threshold_begin', null=False)
    end = models.IntegerField(db_column='threshold_end', null=False)
    # GOOD, BAD, UNCERTAIN
    quality = models.CharField(db_column='quality', max_length=10, null=False)
    # How much it will be relevant for final result
    weight = models.IntegerField(db_column='weight', null=False)

    class Meta:
        db_table = 'Threshold'
        managed = True
        verbose_name = 'Thresholds'
        verbose_name_plural = 'Thresholds'
        ordering = ['id']

    def copy(self, threshold):
        """
        Create new instance with data
        """
        self.indicator = threshold['indicator']
        self.stage = threshold['stage']
        self.begin = threshold['begin']
        self.end = threshold['end']
        self.quality = threshold['quality']
        self.weight = threshold['weight']
        return self
