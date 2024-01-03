from django.db import connections
from decouple import config

def add_database_config(db_name):
    # Créez une nouvelle configuration pour la base de données
    new_db_config = {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': db_name,
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': '5432',
    }

    # Ajoutez la nouvelle configuration à DATABASES
    connections.databases[db_name] = new_db_config