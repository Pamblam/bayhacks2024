#!/usr/bin/env python3

import argparse
import json
import mysql.connector

environment='local'

if(environment=='local'):
  mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="bijoux22",
    database="diseases"
  )
else:
  mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="bayhacks",
    database="diseases"
  )

# Get the program input
parser=argparse.ArgumentParser()
parser.add_argument("--json", help="JSON Data")
args=parser.parse_args()
data = json.loads(args.json)

# Set our response object
response = {'message': '', 'response': {}, 'success': True}

# Function to encode and send the output of the program
def out():
    print(json.dumps(response))
    exit()

# Function to set an error message and send the output of the program
def err(msg):
    response['success'] = False
    response['message'] = msg
    out()

# Do something, depending on what the request is asking for
action = data['action']

if(action == "search_symptoms"):
    symptom=data['symptom']
    mycursor = mydb.cursor()

    mycursor.execute("select * from (select id, name from items union all select synonym_id as id, text as name from synonyms) as q where q.name like %s", ["%"+symptom+"%"])

    myresult = mycursor.fetchall()









    response['response'] = myresult

elif(action == "add"):
    num1 = float(data['num1'])
    num2 = float(data['num1'])
    ans = num1+num2;
    response['response'] = str(num1)+" + "+str(num2)+" = "+str(ans)

elif(action == "subtract"):
    response['response'] = "i dunno"

elif(action == "divide"):
    response['response'] = "i dunno"

elif(action == "multiply"):
    response['response'] = "i dunno"

else:
    err('Invalid action')


out();




