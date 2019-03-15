import json
import requests

json_file = open("SampleEntities.json").read()
data = json.loads(json_file)
base_url = "http://localhost:5000"

for path in data.keys():
    for obj in data[path]:
        curr_url = base_url + path
        print("Url: ", curr_url)
        print("Data: ", obj)
        r = requests.post(url=curr_url, verify=False, json=obj)
        print(r.json())
