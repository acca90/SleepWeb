"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 07/07/2019
"""
from backend.modules.msystem.models import MSystem


class MSystemTaskService:
    """
    Class defined to keep queries and security content for consume monitoring systems in taks
    """
    def fetch(self):
        return MSystem.objects.all()

