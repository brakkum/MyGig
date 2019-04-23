import requests
import random


def random_string(length=10):
    return "".join(random.choice("abcdefghijklmnopqrstuvwxyz") for _ in range(length))


base_url = "https://mygig.online"

users = [
    {"firstName": "Paul", "lastName": "McCartney", "email": "paul@beatles.com"},
    {"firstName": "John", "lastName": "Lennon", "email": "john@beatles.com"},
    {"firstName": "George", "lastName": "Harrison", "email": "george@beatles.com"},
    {"firstName": "Richard", "lastName": "Starkey", "email": "richard@beatles.com"},
    {"firstName": "Robert", "lastName": "Plant", "email": "robert@ledzeppelin.com"},
    {"firstName": "Jimmy", "lastName": "Page", "email": "jimmy@ledzeppelin.com"},
    {"firstName": "John Paul", "lastName": "Jones", "email": "johnpaul@ledzeppelin.com"},
    {"firstName": "John", "lastName": "Bonham", "email": "john@ledzeppelin.com"},
    {"firstName": "Roger", "lastName": "Waters", "email": "roger@pinkfloyd.com"},
    {"firstName": "David", "lastName": "Gilmour", "email": "david@pinkfloyd.com"},
    {"firstName": "Richard", "lastName": "Wright", "email": "richard@pinkfloyd.com"},
    {"firstName": "Nick", "lastName": "Mason", "email": "nick@pinkfloyd.com"}
]

for user in users:
    firstName = user["firstName"]
    lastName = user["lastName"]
    email = user["email"]
    password = "password"
    userObj = {"email": email,
               "firstName": firstName,
               "lastName": lastName,
               "password": password,
               "passwordConfirm": password}
    res = requests.post(url=base_url+"/api/users/newUser", json=userObj).json()
    if res["success"]:
        print("{0} {1} created".format(firstName, lastName))
    else:
        print("{0} {1} already exists".format(firstName, lastName))
