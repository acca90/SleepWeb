"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from django.test import TestCase
from .models import Indicator


class IndicatorTest(TestCase):
    """
    Test module for Indicator model
    """
    description = "Eficiência do Sono"
    definition = "Percentual total de sono profundo"

    def setUp(self):
        """
        Start test case
        """
        Indicator.objects.create(
            description=self.description,
            definition=self.definition
        )

    def test_description(self):
        """
        Test fields for indicator
        """
        indicator = Indicator.objects.get(description=self.description)

        self.assertEqual(
            indicator.description,
            self.description
        )
