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


class Recomendation(models.Model):
    """
    The user (researcher) defines weights for indicators on stage
    this weights are stored and can be reused from this model
    """
    description = models.CharField(db_column='description', max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=None, null=False)

    class Meta:
        db_table = 'Recomendation'
        managed = True
        verbose_name = 'Recomendations'
        verbose_name_plural = 'Recomendations'
        ordering = ['id']

    def __str__(self):
        return self.description


class Rule(models.Model):
    """
    Model that combine an indicator and stage to represent a weight for evaluation
    """
    recomendation = models.ForeignKey(Recomendation, on_delete=models.CASCADE)
    indicator = models.ForeignKey(Indicator, on_delete=None, null=False)
    stage = models.ForeignKey(Stage, on_delete=None, null=False)
    # How much it will be relevant for final result
    weight = models.IntegerField(db_column='weight', null=False)

    class Meta:
        db_table = 'Rule'
        managed = True
        verbose_name = 'Rules'
        verbose_name_plural = 'Rules'
        ordering = ['id']

    def __str__(self):
        return self.indicator.description + ' on ' + self.stage.description + ' weights: ' + str(self.weight) + '%'


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
    # GOOD, BAD, UNCERTAIN
    quality = models.CharField(db_column='quality', max_length=10, null=False)
    top = models.IntegerField(db_column='top', null=False)
    bottom = models.IntegerField(db_column='bottom', null=False)
    rule = models.ForeignKey(Rule, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Threshold'
        managed = True
        verbose_name = 'Thresholds'
        verbose_name_plural = 'Thresholds'
        ordering = ['id']

    def __str__(self):
        return self.quality
