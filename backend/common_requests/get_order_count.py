import requests

res = requests.get("http://127.0.0.1:8000/orders/count")
print(res.json())