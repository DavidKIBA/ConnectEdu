from django.contrib import admin
from .models import Ecoles, ResponsableEcole
# Register your models here.

class EcoleAdmin(admin.ModelAdmin):

    list_display = ['nom', 'email', 'adresse', 'date_creation']


class ResponsableAdmin(admin.ModelAdmin):

    list_display = ['telephone', 'adresse']

admin.site.register(Ecoles, EcoleAdmin)
# admin.site.register(ResponsableEcole, ResponsableAdmin)
