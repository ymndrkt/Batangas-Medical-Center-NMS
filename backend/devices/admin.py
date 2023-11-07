from django.contrib import admin
from .models import Device

models_list = [Device]
admin.site.register(models_list)