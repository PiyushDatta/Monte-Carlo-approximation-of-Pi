from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from montecarlosim.api import views

router = routers.DefaultRouter()    
router.register(r'points', views.PointsViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]