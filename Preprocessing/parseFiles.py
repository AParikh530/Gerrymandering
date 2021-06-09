from shapely.geometry import Polygon
from shapely.ops import cascaded_union
import shapely.ops as ops
import mysql.connector
import json
from geopandas import GeoSeries
import pyproj
from functools import partial
import math
import zlib
from base64 import b85encode
import _thread
import concurrent.futures
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import as_completed

geometry = open("Georgia-Geometry.json")
geometry_data = json.load(geometry)
districtings = open('Georgia-5000.json')
districtings_data = json.load(districtings)
ENACTED_DISTRICTING_ID = "1"

db = mysql.connector.connect(
  host="mysql4.cs.stonybrook.edu",
  user="Mets",
  password="changeit",
  database="Mets",
  port=3306
)

cursor = db.cursor()

sql = "INSERT INTO DISTRICTINGS (id) VALUES ('" + ENACTED_DISTRICTING_ID + "')"
cursor.execute(sql)
db.commit()

sql = "ALTER TABLE DISTRICT_BOUNDS CHANGE column geo_json geo_json mediumtext"
cursor.execute(sql)
db.commit()

sql = "ALTER TABLE PRECINCT_BOUNDS CHANGE column geo_json geo_json mediumtext"
cursor.execute(sql)
db.commit()

districts = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]
precinct_districts = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]
precincts_properties = []
precincts_polygons = []

for precinct in geometry_data["features"]:
    precincts_properties.append(precinct["properties"])
    precinct_geo = []
    cd = int(precinct["properties"]["CD"])

    if precinct["geometry"]["type"] == "Polygon":
        precinct_geometry = Polygon(precinct["geometry"]["coordinates"][0])
        precinct_geo.append(precinct_geometry)
        districts[cd - 1].append(precinct_geometry)
        precinct_districts[cd - 1].append(precinct)
    elif precinct["geometry"]["type"] == "MultiPolygon":
        for poly in precinct["geometry"]["coordinates"]:
            precinct_geometry = Polygon(poly[0])
            precinct_geo.append(precinct_geometry)
            districts[cd - 1].append(precinct_geometry)
            precinct_districts[cd - 1].append(precinct)

    precincts_polygons.append(precinct_geo)

compactness_sum = 0

for district in districts:
    district_polygon = cascaded_union(district)
    district_bounds = GeoSeries([district_polygon]).to_json()
    zipped_bounds = b85encode(zlib.compress(json.dumps(district_bounds).encode('utf-8'))).decode('ascii')

    district_poly_area = ops.transform(
        partial(
            pyproj.transform,
            pyproj.Proj('EPSG:4326'),
            pyproj.Proj(
                proj='aea',
                lat_1=district_polygon.bounds[1],
                lat_2=district_polygon.bounds[3],
            )),
        district_polygon)
    district_area = district_poly_area.area
    district_peri = district_poly_area.length
    compactness = (4 * math.pi * district_area) / (district_peri ** 2)
    compactness_sum += compactness

    sql = "INSERT INTO DISTRICT_BOUNDS (geo_json) VALUES ('" + zipped_bounds + "')"
    cursor.execute(sql)
    # db.commit()

    row_id = cursor.lastrowid
    sql2 = "INSERT INTO DISTRICTS (totpop, vap, hisp, white, black, amin, " \
            "asian, nhpi, aminvap, asianvap, bvap, " \
            "hvap, nhpivap, wvap, bound_id, districting_id) " \
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, " \
            "%s, %s, %s, %s, %s, %s, %s)"
    vals = ("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", str(row_id), ENACTED_DISTRICTING_ID)
    cursor.execute(sql2, vals)
    db.commit()

    row_id = cursor.lastrowid

    for precinct in district:
        precinct_bounds = GeoSeries([precinct]).to_json()

        sql = "INSERT INTO PRECINCT_BOUNDS (geo_json) VALUES ('" + precinct_bounds + "')"
        cursor.execute(sql)
        # db.commit()

        row_id2 = cursor.lastrowid
        index1 = districts.index(district)
        index2 = district.index(precinct)
        amin = str(precinct_districts[index1][index2]["properties"]["AMIN"])
        aminvap = str(precinct_districts[index1][index2]["properties"]["AMINVAP"])
        asian = str(precinct_districts[index1][index2]["properties"]["ASIAN"])
        asianvap = str(precinct_districts[index1][index2]["properties"]["ASIANVAP"])
        black = str(precinct_districts[index1][index2]["properties"]["BLACK"])
        bvap = str(precinct_districts[index1][index2]["properties"]["BVAP"])
        hisp = str(precinct_districts[index1][index2]["properties"]["HISP"])
        hvap = str(precinct_districts[index1][index2]["properties"]["HVAP"])
        nhpi = str(precinct_districts[index1][index2]["properties"]["NHPI"])
        nhpivap = str(precinct_districts[index1][index2]["properties"]["NHPIVAP"])
        white = str(precinct_districts[index1][index2]["properties"]["WHITE"])
        wvap = str(precinct_districts[index1][index2]["properties"]["WVAP"])
        total_pop = str(precinct_districts[index1][index2]["properties"]["TOTPOP"])
        vap = str(precinct_districts[index1][index2]["properties"]["VAP"])
        sql2 = "INSERT INTO PRECINCTS (amin, aminvap, asian, asianvap, black, bvap, hisp, hvap, nhpi, nhpivap, totalPop, vap, white, wVap, district_id, bound_id) " \
               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        vals = (amin, aminvap, asian, asianvap, black, bvap, hisp, hvap, nhpi, nhpivap, white, wvap, total_pop, vap, str(row_id), str(row_id2))
        cursor.execute(sql2, vals)
        db.commit()

compactness = compactness_sum / 14
sql3 = 'UPDATE DISTRICTINGS SET compactness=%s WHERE id=%s'
vals = (str(compactness), ENACTED_DISTRICTING_ID)
cursor.execute(sql3, vals)
db.commit()

print("Done with enacted")

# Collecting all 5000 districtings
districting_counter = 1

for plan in districtings_data["plans"]:
    districting_counter += 1
    districtingID = districting_counter
    districting = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]

    sql3 = "INSERT INTO DISTRICTINGS " \
           "(id, compactness, dev_from_avg_districting, " \
           "dev_from_enacted_plan, minority, mm_district, " \
           "political_fairness, pop_equality, pop_threshold) " \
           "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    vals = (str(districtingID), '0', '0', '0', '0', '0', '0', '0', '0')
    cursor.execute(sql3, vals)
    db.commit()

    for district in plan['districts']:
        district_index = int(district['districtNumber']) - 1
        for precinct_num in district['precincts']:
            districting[district_index].append(precinct_num)

    compactness_sum = 0

    for district in districting:
        district_geometry = []
        constraints = {'TOTPOP': 0, 'VAP': 0, 'HISP': 0, 'WHITE': 0, 'BLACK': 0, 'AMIN': 0, 'ASIAN': 0, 'NHPI': 0, 'HVAP': 0, 'WVAP': 0, 'BVAP': 0, 'AMINVAP': 0, 'ASIANVAP': 0, 'NHPIVAP': 0}

        for precinct_num in district:
            precinct_index = int(precinct_num) - 1
            precinct_info = precincts_properties[precinct_index]

            for poly in precincts_polygons[precinct_index]:
                district_geometry.append(poly)

            constraints["TOTPOP"] += precinct_info["TOTPOP"]
            constraints["VAP"] += precinct_info["VAP"]
            constraints["HISP"] += precinct_info["HISP"]
            constraints["WHITE"] += precinct_info["WHITE"]
            constraints["BLACK"] += precinct_info["BLACK"]
            constraints["AMIN"] += precinct_info["AMIN"]
            constraints["ASIAN"] += precinct_info["ASIAN"]
            constraints["NHPI"] += precinct_info["NHPI"]
            constraints["HVAP"] += precinct_info["HVAP"]
            constraints["WVAP"] += precinct_info["WVAP"]
            constraints["BVAP"] += precinct_info["BVAP"]
            constraints["AMINVAP"] += precinct_info["AMINVAP"]
            constraints["ASIANVAP"] += precinct_info["ASIANVAP"]
            constraints["NHPIVAP"] += precinct_info["NHPIVAP"]

        district_polygon = cascaded_union(district_geometry)
        district_bounds = GeoSeries([district_polygon]).to_json()
        zipped_bounds = b85encode(zlib.compress(json.dumps(district_bounds).encode('utf-8'))).decode('ascii')

        sql1 = "INSERT INTO DISTRICT_BOUNDS (geo_json) VALUES ('" + zipped_bounds + "')"
        cursor.execute(sql1)

        row_id = cursor.lastrowid
        sql2 = "INSERT INTO DISTRICTS " \
               "(totpop, vap, hisp, white, black, amin, " \
               "asian, nhpi, aminvap, asianvap, bvap, " \
               "hvap, nhpivap, wvap, bound_id, districting_id) " \
               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, " \
               "%s, %s, %s, %s, %s, %s, %s)"
        vals = (str(constraints["TOTPOP"]), str(constraints["VAP"]), str(constraints["HISP"]), str(constraints["WHITE"]), str(constraints["BLACK"]), str(constraints["AMIN"]), str(constraints["ASIAN"]), str(constraints["NHPI"]), str(constraints["AMINVAP"]), str(constraints["ASIANVAP"]), str(constraints["BVAP"]), str(constraints["HVAP"]), str(constraints["NHPIVAP"]), str(constraints["WVAP"]), str(row_id), str(districtingID))
        cursor.execute(sql2, vals)
        db.commit()

        district_poly_area = ops.transform(
            partial(
                pyproj.transform,
                pyproj.Proj('EPSG:4326'),
                pyproj.Proj(
                    proj='aea',
                    lat_1=district_polygon.bounds[1],
                    lat_2=district_polygon.bounds[3],
                )),
            district_polygon)
        district_area = district_poly_area.area
        district_peri = district_poly_area.length
        compactness = (4 * math.pi * district_area) / (district_peri ** 2)
        compactness_sum += compactness

    compactness = compactness_sum / 14

    sql3 = 'UPDATE DISTRICTINGS SET compactness=%s WHERE id=%s'
    vals = (str(compactness), str(districtingID))
    cursor.execute(sql3, vals)
    db.commit()

# Collecting all 5000 districtings
# districting_counter = 1
# district_counter = 14
# bounds = []
# districts_info = []
# input_counter = 0
#
# for plan in districtings_data["plans"]:
#     districting_counter += 1
#     districtingID = districting_counter
#     districting = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]
#
#     sql3 = "INSERT INTO DISTRICTINGS " \
#            "(id, compactness, dev_from_avg_districting, " \
#            "dev_from_enacted_plan, minority, mm_district, " \
#            "political_fairness, pop_equality, pop_threshold) " \
#            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
#     vals = (str(districtingID), '0', '0', '0', '0', '0', '0', '0', '0')
#     cursor.execute(sql3, vals)
#     db.commit()
#
#     for district in plan['districts']:
#         district_index = int(district['districtNumber']) - 1
#         for precinct_num in district['precincts']:
#             districting[district_index].append(precinct_num)
#
#     compactness_sum = 0
#
#     for district in districting:
#         district_counter += 1
#         input_counter += 1
#         district_geometry = []
#         constraints = {'TOTPOP': 0, 'VAP': 0, 'HISP': 0, 'WHITE': 0, 'BLACK': 0, 'AMIN': 0, 'ASIAN': 0, 'NHPI': 0, 'HVAP': 0, 'WVAP': 0, 'BVAP': 0, 'AMINVAP': 0, 'ASIANVAP': 0, 'NHPIVAP': 0}
#
#         for precinct_num in district:
#             precinct_index = int(precinct_num) - 1
#             precinct_info = precincts_properties[precinct_index]
#
#             for poly in precincts_polygons[precinct_index]:
#                 district_geometry.append(poly)
#
#             constraints["TOTPOP"] += precinct_info["TOTPOP"]
#             constraints["VAP"] += precinct_info["VAP"]
#             constraints["HISP"] += precinct_info["HISP"]
#             constraints["WHITE"] += precinct_info["WHITE"]
#             constraints["BLACK"] += precinct_info["BLACK"]
#             constraints["AMIN"] += precinct_info["AMIN"]
#             constraints["ASIAN"] += precinct_info["ASIAN"]
#             constraints["NHPI"] += precinct_info["NHPI"]
#             constraints["HVAP"] += precinct_info["HVAP"]
#             constraints["WVAP"] += precinct_info["WVAP"]
#             constraints["BVAP"] += precinct_info["BVAP"]
#             constraints["AMINVAP"] += precinct_info["AMINVAP"]
#             constraints["ASIANVAP"] += precinct_info["ASIANVAP"]
#             constraints["NHPIVAP"] += precinct_info["NHPIVAP"]
#
#         district_polygon = cascaded_union(district_geometry)
#         district_bounds = GeoSeries([district_polygon]).to_json()
#         zipped_bounds = b85encode(zlib.compress(json.dumps(district_bounds).encode('utf-8'))).decode('ascii')
#         bounds.append((district_counter, zipped_bounds))
#         districts_info.append((str(constraints["TOTPOP"]), str(constraints["VAP"]), str(constraints["HISP"]), str(constraints["WHITE"]), str(constraints["BLACK"]), str(constraints["AMIN"]), str(constraints["ASIAN"]), str(constraints["NHPI"]), str(constraints["AMINVAP"]), str(constraints["ASIANVAP"]), str(constraints["BVAP"]), str(constraints["HVAP"]), str(constraints["NHPIVAP"]), str(constraints["WVAP"]), str(district_counter), str(districtingID)))
#
#         if input_counter % 4 == 0:
#             sql1 = "INSERT INTO DISTRICT_BOUNDS (id, geo_json) VALUES (%s, %s)"
#             cursor.executemany(sql1, bounds)
#
#             sql2 = "INSERT INTO DISTRICTS " \
#                    "(totpop, vap, hisp, white, black, amin, " \
#                    "asian, nhpi, aminvap, asianvap, bvap, " \
#                    "hvap, nhpivap, wvap, bound_id, districting_id) " \
#                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, " \
#                    "%s, %s, %s, %s, %s, %s, %s)"
#             cursor.executemany(sql2, districts_info)
#
#             db.commit()
#
#             bounds = []
#             districts_info = []
#
#             # sql1 = "INSERT INTO DISTRICT_BOUNDS (geo_json) VALUES ('" + zipped_bounds + "')"
#             # cursor.execute(sql1)
#             #
#             # row_id = cursor.lastrowid
#             # sql2 = "INSERT INTO DISTRICTS " \
#             #        "(totpop, vap, hisp, white, black, amin, " \
#             #        "asian, nhpi, aminvap, asianvap, bvap, " \
#             #        "hvap, nhpivap, wvap, bound_id, districting_id) " \
#             #        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, " \
#             #        "%s, %s, %s, %s, %s, %s, %s)"
#             # vals = (str(constraints["TOTPOP"]), str(constraints["VAP"]), str(constraints["HISP"]), str(constraints["WHITE"]), str(constraints["BLACK"]), str(constraints["AMIN"]), str(constraints["ASIAN"]), str(constraints["NHPI"]), str(constraints["AMINVAP"]), str(constraints["ASIANVAP"]), str(constraints["BVAP"]), str(constraints["HVAP"]), str(constraints["NHPIVAP"]), str(constraints["WVAP"]), str(row_id), str(districtingID))
#             # cursor.execute(sql2, vals)
#             # db.commit()
#
#         district_poly_area = ops.transform(
#             partial(
#                 pyproj.transform,
#                 pyproj.Proj('EPSG:4326'),
#                 pyproj.Proj(
#                     proj='aea',
#                     lat_1=district_polygon.bounds[1],
#                     lat_2=district_polygon.bounds[3],
#                 )),
#             district_polygon)
#         district_area = district_poly_area.area
#         district_peri = district_poly_area.length
#         compactness = (4 * math.pi * district_area) / (district_peri ** 2)
#         compactness_sum += compactness
#
#     compactness = compactness_sum / 14
#
#     sql3 = 'UPDATE DISTRICTINGS SET compactness=%s WHERE id=%s'
#     vals = (str(compactness), str(districtingID))
#     cursor.execute(sql3, vals)
#     db.commit()

# print("done")


# def run(districtingID, plan):
#     print("Districting ID: " + str(districtingID))
#     db = mysql.connector.connect(
#         host="mysql4.cs.stonybrook.edu",
#         user="Mets",
#         password="changeit",
#         database="Mets",
#         port=3306
#     )
#
#     cursor = db.cursor()
#
#     # for plan in districtings_data["plans"]:
#     districting = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]
#
#     sql3 = "INSERT INTO DISTRICTINGS " \
#            "(id, compactness, dev_from_avg_districting, " \
#            "dev_from_enacted_plan, minority, mm_district, " \
#            "political_fairness, pop_equality, pop_threshold) " \
#            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
#     vals = (str(districtingID), '0', '0', '0', '0', '0', '0', '0', '0')
#     cursor.execute(sql3, vals)
#     db.commit()
#
#     for district in plan['districts']:
#         district_index = int(district['districtNumber']) - 1
#         for precinct_num in district['precincts']:
#             districting[district_index].append(precinct_num)
#
#     compactness_sum = 0
#
#     for district in districting:
#         district_geometry = []
#         constraints = {'TOTPOP': 0, 'VAP': 0, 'HISP': 0, 'WHITE': 0, 'BLACK': 0, 'AMIN': 0, 'ASIAN': 0, 'NHPI': 0,
#                        'HVAP': 0, 'WVAP': 0, 'BVAP': 0, 'AMINVAP': 0, 'ASIANVAP': 0, 'NHPIVAP': 0}
#
#         for precinct_num in district:
#             precinct_index = int(precinct_num) - 1
#             precinct_info = precincts_properties[precinct_index]
#
#             for poly in precincts_polygons[precinct_index]:
#                 district_geometry.append(poly)
#
#             constraints["TOTPOP"] += precinct_info["TOTPOP"]
#             constraints["VAP"] += precinct_info["VAP"]
#             constraints["HISP"] += precinct_info["HISP"]
#             constraints["WHITE"] += precinct_info["WHITE"]
#             constraints["BLACK"] += precinct_info["BLACK"]
#             constraints["AMIN"] += precinct_info["AMIN"]
#             constraints["ASIAN"] += precinct_info["ASIAN"]
#             constraints["NHPI"] += precinct_info["NHPI"]
#             constraints["HVAP"] += precinct_info["HVAP"]
#             constraints["WVAP"] += precinct_info["WVAP"]
#             constraints["BVAP"] += precinct_info["BVAP"]
#             constraints["AMINVAP"] += precinct_info["AMINVAP"]
#             constraints["ASIANVAP"] += precinct_info["ASIANVAP"]
#             constraints["NHPIVAP"] += precinct_info["NHPIVAP"]
#
#         district_polygon = cascaded_union(district_geometry)
#         district_bounds = GeoSeries([district_polygon]).to_json()
#         zipped_bounds = b85encode(zlib.compress(json.dumps(district_bounds).encode('utf-8'))).decode('ascii')
#
#         sql1 = "INSERT INTO DISTRICT_BOUNDS (geo_json) VALUES ('" + zipped_bounds + "')"
#         cursor.execute(sql1)
#
#         row_id = cursor.lastrowid
#         sql2 = "INSERT INTO DISTRICTS " \
#                "(totpop, vap, hisp, white, black, amin, " \
#                "asian, nhpi, aminvap, asianvap, bvap, " \
#                "hvap, nhpivap, wvap, bound_id, districting_id) " \
#                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, " \
#                "%s, %s, %s, %s, %s, %s, %s)"
#         vals = (
#         str(constraints["TOTPOP"]), str(constraints["VAP"]), str(constraints["HISP"]), str(constraints["WHITE"]),
#         str(constraints["BLACK"]), str(constraints["AMIN"]), str(constraints["ASIAN"]), str(constraints["NHPI"]),
#         str(constraints["AMINVAP"]), str(constraints["ASIANVAP"]), str(constraints["BVAP"]),
#         str(constraints["HVAP"]), str(constraints["NHPIVAP"]), str(constraints["WVAP"]), str(row_id),
#         str(districtingID))
#         cursor.execute(sql2, vals)
#         db.commit()
#
#         district_poly_area = ops.transform(
#             partial(
#                 pyproj.transform,
#                 pyproj.Proj('EPSG:4326'),
#                 pyproj.Proj(
#                     proj='aea',
#                     lat_1=district_polygon.bounds[1],
#                     lat_2=district_polygon.bounds[3],
#                 )),
#             district_polygon)
#         district_area = district_poly_area.area
#         district_peri = district_poly_area.length
#         compactness = (4 * math.pi * district_area) / (district_peri ** 2)
#         compactness_sum += compactness
#
#     compactness = compactness_sum / 14
#
#     sql3 = 'UPDATE DISTRICTINGS SET compactness=%s WHERE id=%s'
#     vals = (str(compactness), str(districtingID))
#     cursor.execute(sql3, vals)
#     db.commit()
#     db.close()
#     return True
#
#
# plans = districtings_data["plans"]
# with concurrent.futures.ThreadPoolExecutor(max_workers = 10) as executor:
#     future_for_plan = {executor.submit(run, index, plans[index]): plans[index] for index in range(len(plans))}
#     for future in concurrent.futures.as_completed(future_for_plan):
#         url = future_for_plan[future]
#         try:
#             data = future.result()
#         except Exception as exc:
#             print('Error occurred %s' % (exc))
#         else:
#             print('Success')
#
# # for plan in districtings_data["plans"]:



geometry.close()
districtings.close()

