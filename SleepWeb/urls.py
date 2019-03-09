from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from backend.institution.views import InstitutionViewSet
from frontend.home.views import Home

router = routers.DefaultRouter()
router.register('institution', InstitutionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),

    # views
    url(r'^$', Home.as_view(), name='index'),

    # api
    path('api/', include(router.urls))
]
