"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 06/07/2019
"""
from apscheduler.schedulers.background import BackgroundScheduler


class JobMonitoring:
    """
    Class defined to manage requests and store of new monitoring records
    """
    msystem_service = None

    def __init__(self) -> None:
        """
        Constructor
        """
        from backend.modules.msystem.service import MSystemsRequestService
        self.msystem_service = MSystemsRequestService()
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
        from backend.modules.msystem.models import MSystem
        self.msystem_service.execute_request(
            MSystem.objects.filter(is_active=True),
        )
