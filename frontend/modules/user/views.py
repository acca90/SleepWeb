"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from django.shortcuts import render
from django.views import View


class UserFrontEnd(View):
    template_name = 'user/index.html'

    def get(self, request):
        return render(request, self.template_name)
