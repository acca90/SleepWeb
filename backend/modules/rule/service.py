"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 12/10/2019
"""
from backend.modules.monitoring.models import MonitoringIndicator
from backend.modules.rule.models import Threshold


class RuleService:
    """
    Service that keeps methods relatives to rules
    """
    def evaluate(self, rule_id, monitoring_id):
        """
        Method that evaluate monitoring with rule
        """

        indicators = MonitoringIndicator.objects.filter(monitoring__id=monitoring_id)

        quality_array = []

        for indicator in indicators:
            thresholds = Threshold.objects.filter(
                rule__id=rule_id, begin__gte=indicator.value, end__lte=indicator.value
            )
            quality_array.append(thresholds)

        print(quality_array)
        pass
