from django.db import models
from django.contrib.auth.models import User
from django.core import validators
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Ecoles(models.Model):

    nom = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telephone_1 = models.CharField(max_length=30)
    telephone_2 = models.CharField(max_length=30, blank=True)
    logo = models.ImageField(upload_to="", blank=True)
    adresse = models.CharField(max_length=255)
    ville_residence = models.CharField(max_length=255)
    document = models.FileField(upload_to="", blank=True)
    date_creation = models.DateField()

    class Meta:
        verbose_name = ('Ecole')
        verbose_name_plural = ('Ecoles')

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)

    #     with connections[''].cursor() as cursor:
    #         db_name = f'school_db_{self.nom.lower().replace(" ", "_")}'
    #         cursor.execute(f'CREATE DATABASE {db_name}')

    #     #Utiliser le modèle Responsable de Django pour créer la table
    #     with connections[db_name].schema_editor() as schema_editor:
    #         schema_editor.create_model(ResponsableEcole)

    def __str__(self):
        return self.nom

class ResponsableEcole(models.Model):
    username_validator = UnicodeUsernameValidator()

    
    username = models.CharField(
        max_length=155, unique=True,  
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),  
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
   )
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    email = models.EmailField()
    telephone = models.CharField(max_length=30)
    adresse = models.CharField(max_length=255)
    ville_residence = models.CharField(max_length=255)
    piece_identite = models.ImageField(upload_to="", blank=True)
    photo_profile = models.ImageField(upload_to="", blank=True)

    class Meta:
        verbose_name = ('Responsable Ecole')
        verbose_name_plural = ('Responsable Ecoles')
    
