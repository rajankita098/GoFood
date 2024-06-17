const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://rajankita098:GameOver%40098@cluster0.pzx710p.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully');

    const db = mongoose.connection.db;
    const fetchedData = db.collection("food_items");
    const categoryCollection = db.collection("food_Category");

    const data = await fetchedData.find({}).toArray();
    const catData = await categoryCollection.find({}).toArray();

    console.log('Fetched food items:', data);  // Debug log
    console.log('Fetched food categories:', catData);  // Debug log

    global.food_items = data;
    global.food_Category = catData;

    console.log('Food items and categories fetched and set globally');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1); // Exit the process if the connection fails
  }
};
module.exports = connectToMongoDB;
