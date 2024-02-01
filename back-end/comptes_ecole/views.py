from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, authentication
from .serializers import EcoleSerializer
from .models import Ecoles
from django.contrib.auth import get_user_model

User = get_user_model()

class InscriptionEcole(generics.ListCreateAPIView):

    queryset = Ecoles.objects.all()
    serializer_class = EcoleSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        nom = serializer.validated_data.pop('nom_responsable')
        prenom = serializer.validated_data.pop('prenom_responsable')
        email = serializer.validated_data.pop('email_responsable')
        instance_ecole = serializer.save()
        User.objects.create(username=f"{nom}-OG", first_name=nom, last_name=prenom, email=email, 
                                          password="P@blo 2003", ecoles=instance_ecole)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
























# import logging
# from django.db import connection
# from django.contrib.sites.models import Site
# from django.conf import settings
# from django.core.exceptions import ValidationError
# from rest_framework import generics, status
# from rest_framework.response import Response
# from .models import Ecoles
# from .serializers import EcoleSerializer




#         schema_name = clean_schema_name(nom_ecole)

#         # Valider le schema_name
#         if not is_valid_schema_name(schema_name):
#             logger.error(f"Le nom de l'école '{nom_ecole}' a généré un schema_name invalide: '{schema_name}'")
#             return Response({"error": "Le nom de l'école n'est pas valide pour le schema_name."}, status=status.HTTP_400_BAD_REQUEST)

#         # Enregistrer le schéma par défaut
#         default_schema = connection.schema_name

#         try:
#             # Définir le schema_name
#             connection.set_schema_to_public()

#             serializer = self.get_serializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             self.perform_create(serializer)

#             # Rétablir le schéma par défaut
#             connection.set_schema(default_schema)

#             # Configurer le nom de domaine et le nom du site
#             nom_domaine = schema_name + '.' + settings.BASE_DOMAIN
#             site = Site.objects.create(domain=nom_domaine, name=nom_ecole)

#             headers = self.get_success_headers(serializer.data)
#             return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

#         except ValidationError as e:
#             # En cas d'erreur de validation, assurez-vous de rétablir le schéma par défaut avant de propager l'exception
#             logger.error(f"Erreur de validation lors de la création de l'école '{nom_ecole}': {str(e)}")
#             connection.set_schema(default_schema)
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
