"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from django.db import models
from backend.modules.user.models import User
from backend.modules.institution.models import Institution


class Group(models.Model):
    name = models.CharField(db_column='name', max_length=255, null=False)
    details = models.CharField(db_column='details', max_length=1000, null=False)
    owner = models.ForeignKey(User, db_column='owner', on_delete=None, null=True)

    users = models.ManyToManyField(User, related_name='group_user')
    institutions = models.ManyToManyField(Institution, related_name='grouo_institution')

    class Meta:
        db_table = 'Group'
        managed = True
        verbose_name = 'Groups'
        verbose_name_plural = 'Groups'
        ordering = ['id']

    def __str__(self):
        return self.name
