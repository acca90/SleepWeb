"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since XX
"""
from django.shortcuts import render
from UI.SleepWeb import settings


def locale(request):
    return render(request, 'json/' + settings.LANGUAGE_CODE + ".json")

