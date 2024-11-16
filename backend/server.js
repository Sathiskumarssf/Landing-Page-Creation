const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(cors(
{
origin: ["https://landing-page-creation-xzwb.vercel.app"],
methods: ["POST", "GET"],
credentials: true
}
));
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;;

MongoClient.connect(uri)
  .then((client) => {
    const db = client.db('restaurant');
    
    // Check MongoDB connection by querying the database
    db.command({ ping: 1 })
      .then(() => {
        console.log('Successfully connected to MongoDB');
      })
      .catch((pingError) => {
        console.error('Connected to MongoDB but failed to ping:', pingError.message);
      });

      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });

    // Import and use routes
    const menuRoutes = require('./routes/menu')(db);
    const resevtionRoutes = require('./routes/reservation')(db);
    app.use('/menu', menuRoutes);
    app.use('/reservation',resevtionRoutes)

    // Start the server
     
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

