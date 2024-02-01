from django.db import models

# Create your models here.

class Niveaux(models.Model):

    libelle = models.CharField(max_length=255)
    numero = models.IntegerField(blank=True)

class Professeurs(models.Model):
    matricule = models.CharField(max_length=30)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    telefone = models.CharField(max_length=30)
    niveau = models.ManyToManyField(Niveaux)


class Matieres(models.Model):
    libelle = models.CharField(max_length=255)
    coeficient = models.IntegerField()
    niveau = models.ForeignKey(Niveaux, on_delete=models.CASCADE)
    professeur = models.ForeignKey(Professeurs, on_delete=models.SET_NULL, null=True)


class Salles(models.Model):
    libelle = models.CharField(max_length=20)
    numero = models.IntegerField(blank=True)

class EmploiDuTemps(models.Model):

    choix_jour = [
        ('Lundi', 'Lundi'),
        ('Mardi', 'Mardi'),
        ('Mercredi', 'Mercredi'),
        ('Jeudi', 'Jeudi'),
        ('Vendredi', 'Vendredi'),
        ('Samedi', 'Samedi'),
        ('Dimanche', 'Dimanche'),
    ]

    jour = models.CharField(max_length=255, choices=choix_jour, default='Lundi')
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    classe = models.ForeignKey(Niveaux, on_delete=models.CASCADE)
    matiere = models.ForeignKey(Matieres, on_delete=models.CASCADE)
    professeur = models.ForeignKey(Professeurs, on_delete=models.SET_NULL, null=True)
    salle = models.ForeignKey(Salles, on_delete=models.SET_NULL, null=True)


# class Notes