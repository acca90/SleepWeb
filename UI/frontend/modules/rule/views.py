"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 07/04/2019
"""
from django.shortcuts import render
from django.views import View


class Rule(View):
    template_name = 'rule/index.html'

    def get(self, request):
        return render(request, self.template_name)


class RuleFinder(View):
    template_name = 'rule/modal.html'

    def get(self, request):
        return render(request, self.template_name)
