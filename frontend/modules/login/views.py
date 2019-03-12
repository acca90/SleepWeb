"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 11/03/2018
"""
from django.shortcuts import render
from django.views import View


class Login(View):
    template_name = 'login/index.html'

    def get(self, request):
        return render(request, self.template_name)
