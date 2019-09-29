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


class JobMonitoring:
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
        print("Scheduler for monitoring request is running")
        self.initialize_scheduler()

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
        self.execute_request(self.process_responses)
        self.store_monitorings()

    def collect_systems(self):
        """
        Method defined to initialize collection of monitoring systems
        supported by SleepWeb application
        """
        self.systems = self.msystem_service.fetch()

    def execute_request(self, callback):
        """
        Execute requests for each instaled monitoring system
        """
        if len(self.systems) == 0:
            print('No active monitoring systems')
            pass

        for msystem in self.systems:
            try:
                response = requests.post(msystem.url + 'monitoring', json=self.today())
                callback(msystem, response)
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

                self.monitorings += monitoring_package
            else:
                print(msystem.name + ' -> No data found')
        else:
            # Store request errors
            pass

    def store_monitorings(self):
        """
        Store monitoring systems collected
        """
        self.monitoring_service.split_and_store(self.monitorings)
        pass

    def today(self):
        """
        Returns a dict with current day begin and and timestamos
        """
        utc = arrow.utcnow().replace(hours=settings.TIME_ZONE_VALUE)
        time_format = 'YYYY-MM-DD HH:mm:ss'
        return {
            "begin": "1990-01-01 00:00:00", # str(utc.floor('day').format(time_format)),
            "end": str(utc.ceil('day').format(time_format))
        }
