const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
const atlasUri = process.env.ATLAS_MONGO_URI;

// console.log('Mongo URI:', uri);
console.log('Atlas Mongo URI:', atlasUri);

const connectMongo = async () => {
  try {
    await mongoose.connect(atlasUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectMongo;
