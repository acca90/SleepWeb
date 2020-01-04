"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 07/07/2019
"""
from django.db import transaction
from django.db.models import Q

from backend.modules.group.models import Group
from backend.modules.monitoring.models import Monitoring, MonitoringIndicator
from backend.modules.msystem.models import MSystem
from backend.modules.msystem.service import MSystemsRequestService
from backend.modules.patient.models import Patient
from backend.modules.user.models import User


class MonitoringService:
    """
    Service to keep logics and exposing methods for monitoring
    """
    def split_and_store(self, monitorings):
        """
        Method defined to store new monitoring records
        """
        try:
            with transaction.atomic():
                for monitoring in monitorings:
                    self.store_monitoring(monitoring)
            transaction.commit()
        except Exception as e:
            print("Transaction failed", e)
            transaction.rollback()

    def store_monitoring(self, monitoring):
        """
        Method defined to store monitorings
        """
        new_monitoring = Monitoring()
        new_monitoring.copy(monitoring)

        if new_monitoring.exists():
            print("Monitoring -> monitoring: " + new_monitoring.uuid + " is already stored")
        else:
            new_monitoring.save()
            print("Monitoring -> stored monitoring: " + new_monitoring.uuid)
            self.store_indicators(monitoring['indicators'], new_monitoring)

    def store_indicators(self, indicators, new_monitoring):
        """
        Method defined to store indicators for new monitorings
        """
        for indicator in indicators:
            new_indicator = MonitoringIndicator()
            new_indicator.copy(indicator, new_monitoring).save()

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
        monitoring = None

        if request.user.is_superuser:
            monitoring = Monitoring.objects.get(pk=request.GET['pk'])

        if monitoring is None:
            user = User.objects.get(pk=request.user.id)
            shared_patients = Group.objects.filter(Q(users=user) | Q(institutions=user.institution)).values('patients')
            monitoring = Monitoring.objects.filter(
                Q(pk=request.GET['pk']) & (Q(patient__user=user) | Q(patient__in=shared_patients))
            ).values('id')

            if len(monitoring) != 1:
                return None

            monitoring = Monitoring.objects.get(pk=monitoring[0]['id'])

        return monitoring

    def fetch_dynamic(self, request):
        """
        Method defined to handle requests made by user
        """
        systems = MSystem.objects.filter(
            institution__in=Patient.objects.filter(user__id=request.user.id).values('institutions__id'),
            is_active=True
        )

        MSystemsRequestService().execute_request(systems)
        return True




