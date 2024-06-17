const express = require('express');
const mongoDB = require('./db');
const createUserRoute = require('./routes/createUser');
const displayDataRoute = require('./routes/DisplayData');
const orderDataRoute = require('./routes/orderData'); // Import the orderData route
const cors = require('cors'); // Import the cors package
const googleAuthRoute = require('./routes/googleAuth');


const app = express(); // Initialize the app
const port = 5000;

// Middleware to handle CORS
app.use(cors({
  origin: "http://localhost:3000" // Allow requests from this origin
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB and start the server
mongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to start server', error);
});

// Use the routes
app.use('/api', createUserRoute);
app.use('/api', displayDataRoute);
app.use('/api', orderDataRoute); // Use the imported orderData route
app.use('/api', googleAuthRoute); // Use the imported googleAuth route


app.get('/', (req, res) => {
  res.send('Hello World!');
});
