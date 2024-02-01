from django.db import models
from gestion_ecole.models import Niveaux

# Create your models here.


class Parents(models.Model):
    nom =models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    telephone = models.CharField(max_length=30)
    email = models.EmailField() 
    adresse = models.CharField(max_length=255)
    mot_de_passe = models.CharField(max_length=255)

    class Meta:
        verbose_name = ("Parent")
        verbose_name_plural = ("Parents")
    
    def __str__(self):
        return self.nom

class Eleves(models.Model):

    matricule = models.CharField(max_length=50)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    date_naissance = models.DateField() 
    lieu_naissance = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=30)
    niveau = models.ForeignKey(Niveaux,  on_delete=models.SET_NULL, null=True)
    titeur = models.ForeignKey(Parents, on_delete=models.SET_NULL, null=True)
    class Meta:
        verbose_name = ("Eleve")
        verbose_name_plural = ("Eleves")
    
    def __str__(self):
        return self.nom