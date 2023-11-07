from django.urls import path
from .views import DeviceView
#from .views import device_status
#from .views import network_scan_api

urlpatterns = [
    path('devices/', DeviceView.as_view()),
    path('devices/<int:pk>/', DeviceView.as_view()),

]