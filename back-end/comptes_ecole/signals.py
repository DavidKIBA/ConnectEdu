
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import connections, DEFAULT_DB_ALIAS
from .models import Ecoles, ResponsableEcole
from django.db.backends.utils import CursorWrapper
from django.apps import apps
from django.core.management import call_command

@receiver(post_save, sender=Ecoles)
def create_school_database(sender, instance, created, **kwargs):
    if created:
        app_name = ResponsableEcole._meta.app_label
        with connections['default'].cursor() as cursor:
            db_name = f'school_db_{instance.nom.lower().replace(" ", "_")}'
            cursor.execute(f'CREATE DATABASE {db_name}')

        # Maintenant, la base de données devrait être créée, vous pouvez créer le modèle
        with connections[db_name].schema_editor() as schema_editor:
            schema_editor.create_model(ResponsableEcole)

        try:
            # Générer une migration automatique
            call_command('makemigrations', app_name)
            # Appliquer la migration
            call_command('migrate', app_name)
        except Exception as e:
            print(f"Erreur lors de la génération de la migration : {e}")