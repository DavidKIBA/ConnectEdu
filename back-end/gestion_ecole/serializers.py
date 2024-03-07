from rest_framework import serializers
from .models import *


class SalleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Salles
        fields = ('__all__')

class ProfesseurSerializer(serializers.ModelSerializer):

    class Meta:
        model = Professeurs
        fields = ('__all__')

class MatiereSerializer(serializers.ModelSerializer):

    class Meta:
        model = Matieres
        fields = ('__all__')

class TuteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parents
        fields = '__all__'

class NiveauSerializer(serializers.ModelSerializer):
    class Meta:
        model = Niveaux
        fields = '__all__'

class EleveSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="eleve-detail",
                                               read_only=True, lookup_field="pk")
    class Meta:
        model = Eleves
        fields = '__all__'

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parents
        fields = '__all__'
