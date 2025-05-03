const mongoose = require('mongoose');

let defaultConnection;
let secondaryConnection;

const connectDB = async () => {
  try {
    // Connect to the default (first) database
    defaultConnection = await mongoose.connect('mongodb://localhost:27017/amazon_handmade', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to default DB: amazon_handmade');

    // Connect to the second database using createConnection
    secondaryConnection = mongoose.createConnection('mongodb://localhost:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    secondaryConnection.on('connected', () => {
      console.log('✅ Connected to second DB: myappp');
    });

    secondaryConnection.on('error', (err) => {
      console.error('❌ Error connecting to myapp:', err);
    });

  } catch (error) {
    console.error('❌ Error connecting to databases:', error);
  }
};

module.exports = { connectDB, secondaryConnection };
