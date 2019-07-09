"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 06/07/2019
"""
from django.apps import AppConfig
from backend.jobs.jobmonitoringmanager import JobMonitoringManager


class JobsConfig(AppConfig):
    name = 'backend.jobs'

    def ready(self):
        JobMonitoringManager().schedule_start()
