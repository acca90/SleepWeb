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
    def evaluate(self, monitoring_id, rule_id):
        """
        Method that evaluate monitoring with rule
        Steps =>

        1. FB = Sum weight from all indicators in the rule
        2. FA = Calc FA from each collected indicator in the monitoring
        3. FD = Sum all FA
        4. IDX = Generate index
        """
        quality_array = []

        indicators = MonitoringIndicator.objects.filter(monitoring__id=monitoring_id)

        FB = 0
        FD = 0

        for item in indicators:
            thresholds = Threshold.objects.filter(
                rule__id=rule_id,
                indicator__id=item.indicator.id,
                begin__lte=item.value,
                end__gte=item.value,
            )
            FB += thresholds[0].weight
            FD += self.calc_fa(thresholds[0].weight, thresholds[0].quality)

        print(quality_array)
        pass

    def calc_fa(self, weight, quality):
        """
        Calculacted FA Avaliation Factor from weight and quality
        """
        return 1