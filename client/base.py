import requests

endpoint = "http://localhost:8000/comptes_ecole/inscription/"
nom = input("Veuillez saisir le nom de l'école \n")
email = input("Veuillez saisir l'email de votre école \n")
telephone = input("Veuillez saisir votre numéro de téléphone \n")
adresse = input("Veuillez saisir votre adresse \n")
ville_residence = input("Veuillez saisir votre ville de residence \n")

# Remplacez 'YOUR_TOKEN' par le token d'authentification réel
headers = {'Authorization': 'Token ea51a7c842074b5fb13f1e080e9724e51ecd5688'}

response = requests.post(
    endpoint,
    json={
        'nom': nom,
        'email': email,
        'telephone_1': telephone,
        'adresse': adresse,
        'ville_residence': ville_residence
    },
    headers=headers
)

# print(response.json())
print(response.status_code)
