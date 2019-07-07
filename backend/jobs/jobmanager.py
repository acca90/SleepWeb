"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 06/07/2019
"""
import requests
from apscheduler.schedulers.background import BackgroundScheduler


class JobManager:

    def update(self):
        from backend.modules.msystem.service import MSystemTaskService
        msystem_service = MSystemTaskService()
        msystems = msystem_service.fetch()
        for msystem in msystems:
            requests.post(msystem.url, data={})

    def start(self):
        scheduler = BackgroundScheduler()
        scheduler.add_job(self.update, 'interval', minutes=1)
        scheduler.start()
