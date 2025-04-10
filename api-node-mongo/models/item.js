// models/item.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String,
  country_code: String
}, { _id: false });

const cardSchema = new mongoose.Schema({
  card_number: String,
  card_type: String,
  currency_code: String,
  balance: String
}, { _id: false });

const itemSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  address: addressSchema,
  card: cardSchema,
  married_status: Boolean
}, {
  collection: 'usersObs' // Esto es clave para conectar con la colección correcta
});

module.exports = mongoose.model('Item', itemSchema);
