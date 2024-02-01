# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.response import Response
# from django.shortcuts import redirect

# class CustomTokenObtainPairView(TokenObtainPairView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)

#         # Votre logique de récupération du schema_name ici
#         if response.status_code == 200:
#             user = self.request.user

#             # Vérifier si l'utilisateur est authentifié avant d'accéder à des attributs spécifiques
#             schema_name = self.get_user_schema_name(user)

#                 # Redirigez l'utilisateur vers la page personnalisée après la connexion
#             redirect_url = self.get_redirect_url(schema_name)
#             return redirect(redirect_url)

#         return response

#     def get_user_schema_name(self, user):
#         # Ajoutez ici votre logique pour obtenir le schema_name de l'utilisateur
#         # Peut-être en fonction de l'utilisateur ou de tout autre critère
#         return user.ecoles.schema_name if user.is_authenticated else None

#     def get_redirect_url(self, schema_name):
#         # Ajoutez ici votre logique pour obtenir l'URL de redirection personnalisée en fonction du schema_name
#         # Par exemple, vous pourriez avoir une table de correspondance entre schema_name et URL
#         # Ou vous pouvez construire l'URL en fonction du schema_name
#         return f"{schema_name.replace('_', '-')}.localhost" 
