import requests

res = requests.delete("http://127.0.0.1:8000/orders")
print(res.json())