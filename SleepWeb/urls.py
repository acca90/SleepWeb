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

from frontend.modules.institution.views import Institution
from frontend.modules.login.views import Login, Logout
from frontend.modules.home.views import Home
from backend.modules.user.views import UserViewSet
from frontend.modules.user_fe.views import UserFrontEnd

router = routers.DefaultRouter()
router.register(r'institution', InstitutionViewSet, base_name='Institution')
router.register(r'user', UserViewSet, base_name='user_fe')

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
]
