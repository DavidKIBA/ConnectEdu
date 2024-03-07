from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('ecole/', include('connectedu.routers')),
    path('eleve/',include('gestion_ecole.urls')),
    path('eleve/v2/', include('gestion_ecole.routers')),
    

]
