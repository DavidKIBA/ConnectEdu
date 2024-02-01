from django.contrib import admin
from .models import Ecoles
# Register your models here.

class EcoleAdmin(admin.ModelAdmin):

    list_display = ['nom', 'email', 'adresse', 'date_creation', 'active']




admin.site.register(Ecoles, EcoleAdmin)
