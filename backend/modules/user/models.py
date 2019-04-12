"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from django.contrib.auth.models import AbstractUser
from django.db import models

from backend.modules.institution.models import Institution


class User(AbstractUser):

    institution = models.ForeignKey(Institution, on_delete=None, null=True, blank=True)

    class Meta:
        db_table = 'User'
        managed = True
        verbose_name = 'Users'
        verbose_name_plural = 'Users'
        ordering = ['id']

    def __str__(self):
        return self.email
