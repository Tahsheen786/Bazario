const mongoose = require('mongoose');

// Define the product schema
const handmadeProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: [String],
    required: true
  },
  images: [{
    thumb: {
      type: String,
      required: true
    },
    large: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: true
    },
    hi_res: {
      type: String,
      required: true
    }
  }],
  average_rating: {
    type: Number,
    required: true
  }
});

// Create the model for the collection "handmade_filtered_metadata"
const HandmadeProduct = mongoose.model('HandmadeProduct', handmadeProductSchema, 'handmade_filtered_metadata');

// Export the model to use it in other parts of the application
module.exports = HandmadeProduct;
