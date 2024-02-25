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

mycursor = mydb.cursor()
user_input = "headache"

mycursor.execute("select * from (select id, name from items union all select synonym_id as id, text as name from synonyms) as q where q.name like %s", ["%"+user_input+"%"])

myresult = mycursor.fetchall()

for x in myresult:
  print(x)