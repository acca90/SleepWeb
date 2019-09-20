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

    def filter(self, request, limit=None):
        """
        Method defined to filter monitoring follower user privilege and group restrictions
        """
        if request.user.is_superuser:
            if limit is None:
                return Monitoring.objects.all()
            else:
                return Monitoring.objects.filter(
                    id__in=Monitoring.objects.all()[:limit].values('id')
                )

        user = User.objects.get(pk=request.user.id)
        shared_patients = Group.objects.filter(Q(users=user) | Q(institutions=user.institution)).values('patients')

        if limit is None:
            return Monitoring.objects.filter(
                Q(patient__user=user) |
                Q(patient__in=shared_patients)
            )
        else:
            return Monitoring.objects.filter(
                id__in=Monitoring.objects.filter(
                    Q(patient__user=user) | Q(patient__in=shared_patients)
                )[:limit].values('id')
            )

    def get(self, request):
        """
        Returns monitoring if user has permissions to read it
        """
        if request.user.is_superuser:
            return Monitoring.objects.get(pk=request.GET['pk'])

        user = User.objects.get(pk=request.user.id)
        shared_patients = Group.objects.filter(Q(users=user) | Q(institutions=user.institution)).values('patients')
        monitoring = Monitoring.objects.filter(
            Q(pk=request.GET['pk']) & (Q(patient__user=user) | Q(patient__in=shared_patients))
        ).values('id')

        if len(monitoring) != 1:
            return None

        return Monitoring.objects.get(pk=monitoring[0]['id'])


