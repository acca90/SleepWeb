"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 07/07/2019
"""
from backend.modules.monitoring.models import Monitoring


class MonitoringService:

    def store(self, monitorings):
        for monitoring in monitorings:
            new_monitoring = Monitoring()
            new_monitoring.copy(monitoring)

            if not new_monitoring.exists():
                new_monitoring.save()
