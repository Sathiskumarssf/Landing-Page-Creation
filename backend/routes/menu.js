module.exports = (db) => {
  const express = require('express');
  const router = express.Router();
  const menuCollection = db.collection('menu');

  // GET menu items
  router.get('/', async (req, res) => {
    try {
      const menu = await menuCollection.find({}).toArray();
      res.json(menu);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  });

  // POST add a menu item
  router.post('/', async (req, res) => {
    try {
      const newItem = req.body;
      const result = await menuCollection.insertOne(newItem);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add menu item' });
    }
  });

  return router;
};
