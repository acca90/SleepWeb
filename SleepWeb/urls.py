"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2018
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import include, path
from rest_framework import routers

from backend.modules.institution.views import InstitutionViewSet
from backend.modules.patient.views import PatientViewSet
from backend.modules.stage.views import StageViewSet
from frontend.modules.stage.views import Stage
from frontend.modules.patient.views import Patient
from frontend.modules.institution.views import Institution
from frontend.modules.login.views import Login, Logout
from frontend.modules.home.views import Home
from frontend.modules.user.views import UserFrontEnd
from backend.modules.user.views import UserViewSet


router = routers.DefaultRouter()
router.register(r'institution', InstitutionViewSet, base_name='Institution')
router.register(r'user', UserViewSet, base_name='user')
router.register(r'stage', StageViewSet, base_name='stage')
router.register(r'patient', PatientViewSet, base_name='patient')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),

    # api
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/', include(router.urls)),

    # views
    url(r'^$', Login.as_view(), name='index'),
    url(r'login/(?P<logout>\w+)', login_required(Login.as_view()), name='login'),
    url(r'login/', Login.as_view(), name='login'),
    url(r'logout/', login_required(Logout.as_view()), name='logout'),

    url(r'home/', login_required(Home.as_view()), name='home'),
    url(r'user/', login_required(UserFrontEnd.as_view()), name='user'),
    url(r'institution/', login_required(Institution.as_view()), name='institution'),

    url(r'stage/', login_required(Stage.as_view()), name='stage'),
    url(r'patient/', login_required(Patient.as_view()), name='patient'),
]
