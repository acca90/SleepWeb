"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from django.db import models
from backend.modules.institution.models import Institution


class MSystem(models.Model):
    name = models.CharField(db_column='name', max_length=255, null=False)
    url = models.CharField(db_column='url', max_length=500, null=False)
    description = models.CharField(db_column='description', max_length=1000, null=False)
    institution = models.ForeignKey(Institution, on_delete=None, null=True, blank=True)

    class Meta:
        db_table = 'MSystem'
        managed = True
        verbose_name = 'Monitoring Systems'
        verbose_name_plural = 'Monitoring Systems'
        ordering = ['id']

    def __str__(self):
        return self.name
