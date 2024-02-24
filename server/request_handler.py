#!/usr/bin/env python3

import argparse
import json

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

if(action == "greet"):
    response['response'] = "u suck "+data['name']

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




