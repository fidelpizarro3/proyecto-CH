const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    date: { type: Date, default: Date.now },
});

const AdoptionModel = mongoose.model('Adoption', adoptionSchema);

module.exports = AdoptionModel;
