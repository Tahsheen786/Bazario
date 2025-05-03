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