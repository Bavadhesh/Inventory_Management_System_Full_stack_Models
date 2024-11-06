// app.js - Express Server with EJS
const express = require('express');
const mongoose = require('mongoose');
const InventoryItem = require('./inventoryItem');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/inventoryDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/', async (req, res) => {
  const items = await InventoryItem.find();
  res.render('index', { items });
});

app.post('/items', async (req, res) => {
  const { name, quantity, price } = req.body;
  await new InventoryItem({ name, quantity, price }).save();
  res.redirect('/');
});

app.post('/items/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  await InventoryItem.findByIdAndUpdate(id, { name, quantity, price });
  res.redirect('/');
});

app.post('/items/delete/:id', async (req, res) => {
  await InventoryItem.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'));
