# Generated by Django 5.0 on 2023-12-28 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ecoles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('telephone_1', models.CharField(max_length=30)),
                ('telephone_2', models.CharField(blank=True, max_length=30)),
                ('logo', models.ImageField(blank=True, upload_to='')),
                ('adresse', models.CharField(max_length=255)),
                ('ville_residence', models.CharField(max_length=255)),
                ('date_creation', models.DateField()),
            ],
            options={
                'verbose_name': 'Ecole',
                'verbose_name_plural': 'Ecoles',
            },
        ),
    ]