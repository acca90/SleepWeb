"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 06/07/2019
"""
from django.apps import AppConfig
from backend.jobs.jobmonitoring import JobMonitoring
from backend.jobs.jobstage import JobStage


class JobManager(AppConfig):
    name = 'backend.jobs'

    def ready(self):
        JobStage().schedule_start()
        # JobMonitoring().schedule_start()
