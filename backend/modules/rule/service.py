"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 12/10/2019
"""
from django.forms import model_to_dict

from backend.modules.indicator.models import Indicator
from backend.modules.monitoring.models import MonitoringIndicator, Monitoring
from backend.modules.patient.models import Patient
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
        stage_id = Patient.objects.get(pk=Monitoring.objects.get(pk=monitoring_id).patient.id).stage.id
        indicators = MonitoringIndicator.objects.filter(monitoring__id=monitoring_id)

        fb = 0
        fd = 0
        results = []

        for indicator in indicators:
            threshold = self.load_threshold(rule_id, indicator, stage_id)
            fb += threshold['weight']
            fa = self.calc_fa(threshold['weight'], threshold['quality'])
            fd += fa
            results.append({
                'indicator': model_to_dict(Indicator.objects.get(pk=indicator.indicator.id)),
                'fc': threshold['weight'],
                'fa': fa
            })

        idx = self.calc_idx(fb, fd)
        return {'idx': idx, 'results': results}

    def load_threshold(self, rule_id, indicator, stage_id):
        """
        Method defined to query rule's thresholds
        """
        return Threshold.objects.filter(
            rule__id=rule_id,
            indicator__id=indicator.indicator.id,
            stage__id=stage_id,
            begin__lte=indicator.value,
            end__gte=indicator.value,
        ).values('quality', 'weight')[0]

    def calc_fa(self, fc, quality):
        """
        Calc FA Avaliation Factor from weight and quality
        """
        return fc - (fc - quality)

    def calc_idx(self, fb, fd):
        """
        Calc FD b
        """
        return ((fd * 100) / fb) / 10

    def threholds(self, rule_id, indicator_id, stage_id):
        """
        Method defined to query end serialize threholds for graphical visualization
        """
        thresholds = Threshold.objects.filter(
            rule__id=rule_id,
            indicator__id=indicator_id,
            stage__id=stage_id
        ).values()
        return {'thresholds': thresholds}
