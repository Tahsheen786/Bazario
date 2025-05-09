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

# Loop through all collections and print the first 5 products
for collection_name in collections:
    collection = db[collection_name]
    print(f"\nFirst 5 products from the collection '{collection_name}':")
    
    # Fetch the first 5 products from the collection
    products = collection.find().limit(5)
    
    # Print each product, its data, and type
    for product in products:
        print(f"Product ID: {product['_id']}")  # Assuming product has an '_id' field
        print(f"Product Data: {product}")
        print(f"Type of product: {type(product)}\n")

# Close the MongoDB connection
client.close()
