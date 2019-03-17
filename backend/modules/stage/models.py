"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 16/03/2018
"""
from django.db import models


class Stage(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    description = models.CharField(db_column='description', max_length=255, null=False)
    definition = models.CharField(db_column='definition', max_length=1000, null=False)

    class Meta:
        db_table = 'Stage'
        managed = True
        verbose_name = 'Stages'
        verbose_name_plural = 'Stages'
        ordering = ['id']

    def __str__(self):
        return self.description
