# import requests
# from getpass import getpass

# endpoint = "http://localhost:8000/api/token/"
# username = input("Veuillez saisir votre username \n")
# password =getpass("Veuillez saisir votre password \n")
# auth_response = requests.post(endpoint, json={'username':username, 'password':password})
# print (auth_response.json())
# token = auth_response.json().get('token')

# if auth_response.status_code == 200:
#     endpoint = "http://localhost:8000/admin-tenant/"
#     headers = {
#         'Authorization': f'Token {token}'
#     }
#     response = requests.get(endpoint, headers=headers)
#     print(response.json())
#     print(response.status_code)

import requests
from getpass import getpass

endpoint = "http://localhost:8000/api/token/"
username = input("Veuillez saisir votre username \n")
password = getpass("Veuillez saisir votre password \n")

# Demande d'authentification
auth_response = requests.post(endpoint, json={'username': username, 'password': password})

# Vérification de l'authentification
if auth_response.status_code == 200:
    token = auth_response.json().get('token')
    
    # Demande à l'endpoint /admin-tenant/ avec le token
    endpoint_admin = "http://localhost:8000/inscription/ecole/"
    headers = {'Authorization': f'Token {token}'}

    try:
        response = requests.get(endpoint_admin, headers=headers)
        response.raise_for_status()  # Lèvera une exception pour les codes d'erreur HTTP
        print(response.json())
        print(response.status_code)
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la demande vers /admin-tenant/: {e}")
else:
    print(f"Échec de l'authentification: {auth_response.status_code}")



