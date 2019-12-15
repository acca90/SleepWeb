from apscheduler.schedulers.background import BackgroundScheduler


class JobStage:
    """
    Class defined to manage requests and store of new monitoring records
    """
    service = None
    monitorings = []

    def __init__(self) -> None:
        """
        Constructor
        """
        from backend.modules.stage.service import StageService
        self.service = StageService()
        super().__init__()

    def schedule_start(self):
        """
        Start method initialize JobManger with scheduler
        """
        print("Scheduler for stage classification")
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
        from backend.modules.patient.models import Patient
        patients = Patient.objects.all()
        for patient in patients:
            self.service.rank_by_object(patient)