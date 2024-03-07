from rest_framework.routers import DefaultRouter
from gestion_ecole.views import *
from gestion_ecole_2.views import *

router = DefaultRouter()

router.register('eleve', ElevesView, basename='eleve')


urlpatterns = router.urls