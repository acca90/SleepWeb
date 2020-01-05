"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 07/07/2019
"""
import arrow
import requests
from SleepWeb import settings


class MSystemsRequestService:
    """
    Service defined to realize request for monitoring systems
    """
    monitoring_service = None
    monitorings = []

    def __init__(self) -> None:
        """
        Constructor
        """
        from backend.modules.monitoring.service import MonitoringService

        self.monitoring_service = MonitoringService()
        super().__init__()

    def execute_request(self, systems):
        """
        Execute requests for each instaled monitoring system
        """
        if len(systems) == 0:
            print('No active monitoring systems')
            pass

        for msystem in systems:
            try:
                response = requests.post(msystem.url + 'monitoring', json=self.today())
                self.process_responses(msystem, response)
                self.store_monitorings()
            except Exception as e:
                print("Monitoring request failed: ", e)

    def process_responses(self, msystem, response):
        """
        Store response to persist collected monitorings
        """
        if response.status_code == 200:
            monitoring_package = response.json()
            if len(monitoring_package) > 0:
                for monitoring in monitoring_package:
                    monitoring['system'] = msystem.pk
                    self.monitorings.append(monitoring)
            else:
                print(msystem.name + ' -> No data found')

    def store_monitorings(self):
        """
        Store monitoring systems collected
        """
        self.monitoring_service.split_and_store(self.monitorings)

    def today(self):
        """
        Returns a dict with current day begin and and timestamos
        """
        utc = arrow.utcnow().replace(hours=settings.TIME_ZONE_VALUE)
        time_format = 'YYYY-MM-DD HH:mm:ss'
        return {
            "begin": "1990-01-01 00:00:00",  # str(utc.floor('day').format(time_format)),
            "end": str(utc.ceil('day').format(time_format))
        }
