from rest_framework import serializers
from .models import Ecoles, ResponsableEcole


class EcoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ecoles
        fields = ('nom', 'email', 'telephone_1', 'telephone_2', 'adresse', 'ville_residence', 'logo', 'date_creation', 'document')


class ResponsableSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResponsableEcole
        fields = ('username', 'nom', 'prenom', 'email', 
                  'telephone', 'adresse', 'ville_residence', 'piece_identite', 'photo_profile')
