const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
});

const PetModel = mongoose.model('Pet', petSchema);
module.exports = PetModel;
