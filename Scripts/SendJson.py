import json
import requests

json_file = open("SampleEntities.json").read()
data = json.loads(json_file)
base_url = "http://localhost:5000"

for url in data.keys():
    for obj in data[url]:
        curr_url = base_url+url
        print("Url: ", curr_url)
        print("Data: ", obj)
        r = requests.post(url=curr_url, verify=False, json=obj)
        print(r.json())
