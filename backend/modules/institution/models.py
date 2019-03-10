"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""


from django.db import models


# Create your models here.
class Institution(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    name = models.CharField(db_column='name', max_length=255, null=False)
    country = models.CharField(db_column='country', max_length=255, null=False)

    class Meta:
        db_table = 'Institution'
        managed = True
        verbose_name = 'Institutions'
        verbose_name_plural = 'Institutions'
        ordering = ['id']


    def __str__(self):
        return self.name
