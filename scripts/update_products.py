import requests
import base64
# récupérer tous les produits dans l'api

res = requests.get('http://localhost:3131/api/products')
print(res)
products = res.json()["results"]
print(products)

# mettre à jour tous les produits avec l'endpoint put

for product in products:
    print("old product", product)

    # recupérer le thumbnail du produit en local
    # thumbnail_local_path = product["thumbnail"]
    # thumbnail = open("./scripts/" + thumbnail_local_path, "rb")
    # thumbnail_base64 = base64.b64encode(thumbnail.read()).decode('utf-8')
    # product["thumbnail_base64"] = thumbnail_base64
    # product["thumbnail_name"] = thumbnail_local_path.split("/")[-1]
    
    # recupérer le packshot du produit en local
    # packshot_local_path = product["packshot"]
    # packshot = open("./scripts/" + packshot_local_path, "rb")
    # packshot_base64 = base64.b64encode(packshot.read()).decode('utf-8')
    # product["packshot_base64"] = packshot_base64
    # product["packshot_name"] = packshot_local_path.split("/")[-1]
    
    #  mettre à jour le produit avec les nouvelles images
    # res = requests.put(f'http://localhost:3131/api/products/' + str(product["id"]), json=product)
    # print(res)
    # print(res.json())
