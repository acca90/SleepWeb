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
    template_name = 'auth/index.html'

    def get(self, request):

        logout = 'false'
        if 'logout' in request.GET:
            logout = request.GET['logout']

        auth = 'true'
        if 'auth' in request.GET:
            auth = request.GET['auth']

        return render(request, self.template_name, {'logout': logout, 'auth': auth})


class Logout(View):
    template_name = 'auth/logout.html'

    def get(self, request):
        return render(request, self.template_name)
