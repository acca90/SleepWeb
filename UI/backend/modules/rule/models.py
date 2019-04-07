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


class RuleWeight(models.Model):
    """
    Model that combine an indicator and stage to represent a weight for evaluation
    """
    indicator = models.ForeignKey(Indicator, on_delete=None, null=False)
    stage = models.ForeignKey(Stage, on_delete=None, null=False)
    weight = models.IntegerField(db_column='weight', null=False)

    class Meta:
        db_table = 'RuleWeight'
        managed = True
        verbose_name = 'Weights'
        verbose_name_plural = 'Weights'
        ordering = ['id']

    def __str__(self):
        return self.indicator.description + ' on ' + self.stage.description + ' weights: ' + str(self.weight) + '%'


class Rule(models.Model):
    """
    The user (researcher) defines weights for indicators on stage
    this weights are stored and can be reused from this model
    """
    description = models.CharField(db_column='description', max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=None, null=False)
    weights = models.ManyToManyField(RuleWeight, related_name='rule_weights')

    class Meta:
        db_table = 'Rule'
        managed = True
        verbose_name = 'Rules'
        verbose_name_plural = 'Rules'
        ordering = ['id']

    def __str__(self):
        return self.description



