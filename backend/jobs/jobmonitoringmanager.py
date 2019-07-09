"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 06/07/2019
"""
import requests
from apscheduler.schedulers.background import BackgroundScheduler


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

        # todo Verificar sempre os sistemas existentes
        # todo flag de ativação inativação
        # todo request para URL de reconhecimento

        self.collect_systems()
        self.initialize_scheduler()
        # pass

    def initialize_scheduler(self):
        """
        Method to initialize apscheduler
        """
        scheduler = BackgroundScheduler()
        scheduler.add_job(self.do, 'interval', minutes=1)
        scheduler.start()

    def do(self):
        """
        Method defined to repeat requests and store monitorings received
        """
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
            self.process_responses(requests.post(msystem.url, data={}))

    def process_responses(self, response):
        """
        Store response to persist collected monitorings
        """
        if response.status_code == 200:
            self.monitorings.append(response.json()[0])
        else:
            # Store request errors
            pass

    def store_monitorings(self):
        """
        Store monitoring systems collected
        """
        self.monitoring_service.store(self.monitorings)
        print('monitoring persisted')
        pass





