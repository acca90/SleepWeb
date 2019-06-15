"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 08/06/2019
"""


class ThresholdQuality:
    APPROPRIATE = 1
    UNCERTAIN = 0
    INAPPROPRIATE = -1


class Indicator:
    SLEEP_EFFICIENCY = 1
    SLEEP_LATENCY = 2
    REM_SLEEP_PERC = 3
    NON_REM_SLEEP_1_2_PERC = 4
    NON_REM_SLEEP_3_4_PERC = 5
    NAP_EPISODE = 6
    NAP_DURATION = 7
    NAP_FREQUENCY = 8
    AROUSALS = 9
    AWAKENINGS = 10
    WASO = 11


class Stages:
    NEWBORN = 1
    INFANT = 2
    TODDLER = 3
    PRE_SCHOOLER = 4
    SCHOOL_AGED = 5
    TEEN = 6
    YOUNG = 7
    ADULT = 8
    OLDER_ADULT = 9
