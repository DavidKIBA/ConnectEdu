from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.EleveUploadExcelView.as_view(), name="eleve-create"),
    # path('v2/', views.ElevesView.as_view(), name="eleve-v2"),
]