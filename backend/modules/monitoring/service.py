"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 07/07/2019
"""
from django.db.models import Q

from backend.modules.group.models import Group
from backend.modules.monitoring.models import Monitoring
from backend.modules.user.models import User


class MonitoringService:
    """
    Service to keep logics and exposing methods for monitoring
    """

    def store(self, monitorings):
        """
        Method defined to store new monitoring records
        """
        for monitoring in monitorings:
            new_monitoring = Monitoring()
            new_monitoring.copy(monitoring)

            if new_monitoring.exists():
                print("Monitoring -> " + new_monitoring.uuid + " already stored")
            else:
                new_monitoring.save()

    def filter(self, request):
        """
        Method defined to filter monitoring follower user privilege and group restrictions
        """
        if request.user.is_superuser:
            return Monitoring.objects.all()

        user = User.objects.get(pk=request.user.id)
        shared_patients = Group.objects.filter(Q(users=user) | Q(institutions=user.institution)).values('patients')

        return Monitoring.objects.filter(
            Q(patient__user=user) |
            Q(patient__in=shared_patients)
        )
