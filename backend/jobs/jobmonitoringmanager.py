"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 06/07/2019
"""
import arrow
import requests
from apscheduler.schedulers.background import BackgroundScheduler
from SleepWeb import settings


class JobMonitoringManager:
    """
    Class defined to manage requests and store of new monitoring records
    """
    msystem_service = None
    monitoring_service = None
    systems = None
    monitorings = []

    def __init__(self) -> None:
        """
        Constructor
        """
        from backend.modules.msystem.service import MSystemTaskService
        from backend.modules.monitoring.service import MonitoringService

        self.msystem_service = MSystemTaskService()
        self.monitoring_service = MonitoringService()
        super().__init__()

    def schedule_start(self):
        """
        Start method initialize JobManger with scheduler
        """
        self.initialize_scheduler()
        # todo Verificar sempre os sistemas existentes
        # todo flag de ativação inativação
        # todo request para URL de reconhecimento

    def initialize_scheduler(self):
        """
        Method to initialize apscheduler
        """
        scheduler = BackgroundScheduler()
        scheduler.add_job(self.do, 'interval', minutes=1)
        scheduler.start()
        self.do()

    def do(self):
        """
        Method defined to repeat requests and store monitorings received
        """
        self.collect_systems()
        self.execute_request()
        self.store_monitorings()

    def collect_systems(self):
        """
        Method defined to initialize collection of monitoring systems
        supported by SleepWeb application
        """
        self.systems = self.msystem_service.fetch()

    def execute_request(self):
        """
        Execute requests for each instaled monitoring system
        """
        for msystem in self.systems:
            response = requests.post(
                msystem.url,
                data=self.today()
            )
            self.process_responses(response)

    def process_responses(self, response):
        """
        Store response to persist collected monitorings
        """
        if response.status_code == 200:
            json = response.json()
            if len(json) > 0:
                self.monitorings.append(json[0])
            else:
                print('No data found')
        else:
            # Store request errors
            pass

    def store_monitorings(self):
        """
        Store monitoring systems collected
        """
        self.monitoring_service.store(self.monitorings)
        pass

    def today(self):
        """
        Returns a dict with current day begin and and timestamos
        """
        utc = arrow.utcnow().replace(hours=settings.TIME_ZONE_VALUE)
        time_format = 'YYYY-MM-DD HH:mm:ss'
        return {
            "begin": str(utc.floor('day').format(time_format)),
            "end": str(utc.ceil('day').format(time_format))
        }
