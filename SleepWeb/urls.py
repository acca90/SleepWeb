"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from backend.modules.institution.views import InstitutionViewSet

from frontend.modules.institution.views import Institution
from frontend.modules.home.views import Home

router = routers.DefaultRouter()
router.register('institution', InstitutionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),

    # views
    url(r'^$', Home.as_view(), name='index'),
    url(r'institution/', Institution.as_view(), name='institution'),

    # api
    path('api/', include(router.urls)),
]
