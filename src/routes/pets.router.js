const { Router } = require('express');
const PetModel = require('../dao/models/pet.model');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.json({ status: 'success', payload: pets });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al obtener mascotas' });
  }
});

module.exports = router;
