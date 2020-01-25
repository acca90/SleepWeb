"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 05/01/2020
"""
from backend.modules.monitoring.models import Monitoring
from backend.modules.rule.service import RuleService


class PeriodService:
    """
    Class defined to keep period related process
    """
    def evaluate(self, period):
        """
        Method defined to evaluate a complete period of monitorings
        """
        data = []
        monitorings = Monitoring.objects.filter(
            reference__patient__id=period.patient.id,
            begin__gte=period.begin,
            end__lte=period.end
        )
        for monitoring in monitorings:
            data.append(RuleService().evaluate(monitoring.id, period.rule.id))

        return data
