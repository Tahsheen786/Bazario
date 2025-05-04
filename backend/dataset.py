from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

# List all databases
databases = client.list_database_names()
print("Databases in MongoDB:", databases)

# If amazon_handmade exists, list its collections
if "amazon_handmade" in databases:
    db = client["amazon_handmade"]
    collections = db.list_collection_names()
    print("Collections in amazon_handmade:", collections)
else:
    print("amazon_handmade database not found.")

import json
from pymongo import MongoClient

# Connect to MongoDB (adjust the URI if needed)
client = MongoClient("mongodb://localhost:27017/")

# Select the database
users = list(client["myapp"]["users"].find({}))
for u in users:
    u["_id"] = str(u["_id"])
with open("backend/data/users.json", "w") as f:
    json.dump(users, f, indent=4)
