import mysql.connector

db = mysql.connector.connect(
  host="mysql4.cs.stonybrook.edu",
  user="Mets",
  password="changeit",
  database="Mets",
  port=3306
)

cursor = db.cursor()

sql = "ALTER TABLE PRECINCT_BOUNDS CHANGE column geo_json geo_json mediumtext"
cursor.execute(sql)
db.commit()

precinct_data = open("Georgia-Geometry.json")

counter = 0
for precinct in precinct_data:
    if precinct[0] != ']' and precinct[0] != '}' and counter > 3:
        sql = "INSERT INTO PRECINCT_BOUNDS (geo_json) VALUES ('" + precinct + "')"
        cursor.execute(sql)
        db.commit()
    counter+=1

print("done")

precinct_data.close()

