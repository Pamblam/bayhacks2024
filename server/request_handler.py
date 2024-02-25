#!/usr/bin/env python3

import argparse
import json
import mysql.connector

environment='remote'


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

    mycursor.execute("select distinct * from (select id, name from items union all select synonym_id as id, text as name from synonyms) as q where q.name like %s", ["%"+symptom+"%"])

    myresult = mycursor.fetchall()

    response['response'] = myresult

elif(action == "symptom_match"):
    disease_count = 0
    ids = data["ids"]
    id_list = ids.split(",")
    matches = []
    if "limit" in data:
        limit = data["limit"]
    else:
        limit = False

    # Searching for diseases 
    for id in id_list:
        mycursor = mydb.cursor()
        mycursor.execute("SELECT cause_item_id FROM diseases.cause_effect where effect_item_id = %s", [id])
        myresult = mycursor.fetchall()
        for item in myresult:
            cause_id = item[0]
            if cause_id not in matches:
                matches.append(cause_id)



    # Looking for other symptoms of diseases that include initial symptom list
    symptoms_list = []
    for disease in matches:

        symptoms_found = {}
        for id in id_list:
            id = int(id)
            symptoms_found[id] = False


        mycursor = mydb.cursor()
        mycursor.execute("SELECT i.name, c.effect_item_id FROM diseases.cause_effect as c left join items as i on c.effect_item_id = i.id where cause_item_id = %s", [disease])
        myresult = mycursor.fetchall()

        # looping thru symptoms of, just to see if all items are present 
        for result in myresult:
            id = result[1]
            id = int(id)
            # if id in symptoms_found:
            if id in symptoms_found.keys():
                symptoms_found[id] = True

        

        # if all items are present
        all_exist = True
        for key in symptoms_found:
            if symptoms_found[key]== False:
                all_exist = False

        if all_exist:
            disease_count += 1
            for result in myresult:
                # does the symptom exist in the list
                exists = False
                # {symptom:"name", id:0, match_count:1}
                for symptom in symptoms_list:
                    if symptom["id"] == result[1]:
                        exists = True
                        symptom["match_count"] += 1
                if exists == False:
                    symptoms_list.append({"symptom": result[0], "match_count": 1, "id": result[1]})
        
        

    sorted_symptoms_list = sorted(symptoms_list, key = lambda i: i["match_count"], reverse=True) 
    if limit: 
        response['response'] = {'count':disease_count, "result":sorted_symptoms_list[:int(limit)]}
    else:
        response['response'] = {'count':disease_count, "result":sorted_symptoms_list}
    # print(matches)


else:
    err('Invalid action')


out();




