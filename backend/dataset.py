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

from pymongo import MongoClient
import json

# Connect to MongoDB (adjust the URI if needed)
client = MongoClient("mongodb://localhost:27017/")

# Select the database
db = client["amazon_handmade"]

# List of collections to export
collections = ["handmade_filtered_metadata"]

for collection_name in collections:
    collection = db[collection_name]
    
    # Fetch the first 100 documents
    documents = list(collection.find({}).limit(100))

    # Convert ObjectId to string
    for doc in documents:
        doc["_id"] = str(doc["_id"])

    # Write to JSON file
    with open(f"{collection_name}_first_100.json", "w", encoding="utf-8") as f:
        json.dump(documents, f, indent=4, ensure_ascii=False)

    print(f"Exported first 100 entries from '{collection_name}' to {collection_name}_first_100.json")
