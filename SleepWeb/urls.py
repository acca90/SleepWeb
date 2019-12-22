"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import include, path
from rest_framework import routers

# Back-End
from backend.modules.institution.views import InstitutionViewSet
from backend.modules.monitoring.views import MonitoringReadOnlyViewSet, MonitoringDashboardViewSet
from backend.modules.patient.views import PatientViewSet, patient_send
from backend.modules.period.views import PeriodViewSet
from backend.modules.stage.views import StageViewSet
from backend.modules.user.views import UserViewSet
from backend.modules.msystem.views import MSystemViewSet
from backend.modules.indicator.views import IndicatorViewSet
from backend.modules.group.views import GroupViewSet
from backend.modules.rule.views import RuleViewSet, monitoring_evaluate, thresholds_view

# Front-End
from frontend.modules.home.views import Home
from frontend.modules.login.views import Login, Logout
from frontend.modules.monitoring.views import Monitoring, MonitoringFinder
from frontend.modules.stage.views import Stage, StageFinder
from frontend.modules.msystem.views import MSystem
from frontend.modules.indicator.views import Indicator, IndicatorFinder
from frontend.modules.group.views import Group
from frontend.modules.patient.views import Patient, PatientFinder
from frontend.modules.institution.views import Institution, InstitutionFinder
from frontend.modules.user.views import UserFrontEnd, UserFinder
from frontend.modules.rule.views import Rule, RuleFinder
from frontend.modules.period.views import Period

from frontend.modules.views import locale

router = routers.DefaultRouter()
router.register(r'institution', InstitutionViewSet, base_name='Institution')
router.register(r'user', UserViewSet, base_name='user')
router.register(r'stage', StageViewSet, base_name='stage')
router.register(r'patient', PatientViewSet, base_name='patient')
router.register(r'msystem', MSystemViewSet, base_name='msystem')
router.register(r'indicator', IndicatorViewSet, base_name='indicator')
router.register(r'group', GroupViewSet, base_name='group')
router.register(r'rule', RuleViewSet, base_name='rule')
router.register(r'period', PeriodViewSet, base_name='period')
router.register(r'monitoring', MonitoringReadOnlyViewSet, base_name='monitoring')
router.register(r'dashboard/monitoring', MonitoringDashboardViewSet, base_name='dashboard_monitoring')

urlpatterns = [
    path('admin/', admin.site.urls),

    # api
    path('api/v1/monitoring/evaluate/<int:monitoring_id>/<int:rule_id>/', monitoring_evaluate),
    path('api/v1/rule/thresholds/<int:rule_id>/<int:indicator_id>/<int:monitoring_id>/', thresholds_view),
    path('api/v1/patient/send/<int:pk>/', patient_send),
    path('api/v1/api-auth/', include('rest_framework.urls')),
    path('api/v1/rest-auth/', include('rest_auth.urls')),
    path('api/v1/', include(router.urls)),

    # views
    url(r'^$', Login.as_view(), name='index'),
    url(r'login/(?P<logout>\w+)', login_required(Login.as_view()), name='login'),
    url(r'login/', Login.as_view(), name='login'),
    url(r'logout/', login_required(Logout.as_view()), name='logout'),
    url(r'json/datatables/', login_required(locale), name='logout'),

    url(r'^home/', login_required(Home.as_view()), name='home'),
    url(r'^user/', login_required(UserFrontEnd.as_view()), name='user'),
    url(r'^institution/', login_required(Institution.as_view()), name='institution'),
    url(r'^group/', login_required(Group.as_view()), name='group'),
    url(r'^indicator/', login_required(Indicator.as_view()), name='indicator'),
    url(r'^msystem/', login_required(MSystem.as_view()), name='msystem'),
    url(r'^stage/', login_required(Stage.as_view()), name='stage'),
    url(r'^patient/', login_required(Patient.as_view()), name='patient'),
    url(r'^rule/', login_required(Rule.as_view()), name='rule'),
    url(r'^period/', login_required(Period.as_view()), name='period'),
    url(r'^monitoring/', login_required(Monitoring.as_view()), name='monitoring'),

    url(r'^finder/user/$', login_required(UserFinder.as_view()), name='userFinder'),
    url(r'^finder/institution/$', login_required(InstitutionFinder.as_view()), name='InstitutionFinder'),
    url(r'^finder/indicator/$', login_required(IndicatorFinder.as_view()), name='IndicatorFinder'),
    url(r'^finder/stage/$', login_required(StageFinder.as_view()), name='StageFinder'),
    url(r'^finder/patient/$', login_required(PatientFinder.as_view()), name='PatientFinder'),
    url(r'^finder/rule/$', login_required(RuleFinder.as_view()), name='RuleFinder'),
    url(r'^finder/monitoring/$', login_required(MonitoringFinder.as_view()), name='MonitoringFinder'),

    url(r'^django_task/', include('django_task.urls', namespace='django_task')),
]
