import requests
import random


base_url = "https://localhost:5001"


def random_string(length=10):
    return "".join(random.choice("abcdefghijklmnop") for _ in range(length))


users = [
    {"firstName": "Paul", "lastName": "McCartney"},
    {"firstName": "John", "lastName": "Lennon"},
    {"firstName": "George", "lastName": "Harrison"},
    {"firstName": "Richard", "lastName": "Starky"}
]


for user in users:
    firstName = user["firstName"]
    lastName = user["lastName"]
    email = random_string()
    password = "password"
    userObj = {"email": email,
               "firstName": firstName,
               "lastName": lastName,
               "password": password,
               "passwordConfirm": password}
    requests.post(url=base_url+"/api/users/newUser", verify=False, json=userObj)
    print("{0} {1} created".format(firstName, lastName))
