const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const reservationsCollection = db.collection('reservations');

  // POST add a reservation
  router.post('/', async (req, res) => {
    try {
      const reservation = req.body;
      const result = await reservationsCollection.insertOne(reservation);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add reservation' });
    }
  });

  // GET all reservations
  router.get('/', async (req, res) => {
    try {
      const reservations = await reservationsCollection.find({}).toArray();
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
  });

  return router;
};
