"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 17/07/2019
"""
from django.shortcuts import render
from django.views import View


class Monitoring(View):
    template_name = 'monitoring/index.html'

    def get(self, request):
        return render(request, self.template_name)


class MonitoringFinder(View):
    template_name = 'monitoring/modal.html'

    def get(self, request):
        return render(request, self.template_name)
