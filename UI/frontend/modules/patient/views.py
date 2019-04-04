"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from django.shortcuts import render
from django.views import View


class Patient(View):
    template_name = 'patient/index.html'

    def get(self, request):
        return render(request, self.template_name)


class PatientFinder(View):
    template_name = 'patient/modal.html'

    def get(self, request):
        return render(request, self.template_name)
