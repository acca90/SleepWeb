"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from django.db import models


class Indicator(models.Model):

    description = models.CharField(db_column='description', max_length=255, null=False)
    definition = models.CharField(db_column='definition', max_length=1000, null=False)

    class Meta:
        db_table = 'Indicator'
        managed = True
        verbose_name = 'Indicators'
        verbose_name_plural = 'Indicators'
        ordering = ['id']

    def __str__(self):
        return self.description
