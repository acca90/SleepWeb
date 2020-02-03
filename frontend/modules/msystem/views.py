"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 21/03/2019
"""
from django.shortcuts import render
from django.views import View


class MSystem(View):
    template_name = 'msystem/index.html'

    def get(self, request):
        return render(request, self.template_name)


class MSystemFinder(View):
    template_name = 'msystem/modal.html'

    def get(self, request):
        return render(request, self.template_name)
