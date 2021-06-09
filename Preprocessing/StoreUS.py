import mysql.connector
import json

db = mysql.connector.connect(
  host="mysql4.cs.stonybrook.edu",
  user="Mets",
  password="changeit",
  database="Mets",
  port=3306
)

cursor = db.cursor()

US_json_data = open("US.json")
US_json_dict = json.loads(US_json_data.read())
US_json_str = json.dumps(US_json_dict)

sql = "ALTER TABLE COUNTRY_BOUNDS CHANGE column geo_json geo_json mediumtext"
cursor.execute(sql)
db.commit()

sql2 = "INSERT INTO COUNTRY_BOUNDS (geo_json) VALUES ('" + US_json_str + "')"
cursor.execute(sql2)
db.commit()

row_id = cursor.lastrowid
sql3 = "INSERT INTO COUNTRIES (bound_id) VALUES ('" + str(row_id) + "')"
cursor.execute(sql3)
db.commit()

print("done")

US_json_data.close()