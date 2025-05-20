const { Router } = require('express');
const { generateUsers, generatePets } = require('../utils/mocking.utils');
const bcrypt = require('bcrypt');
const UserModel = require('../dao/models/user.model');
const PetModel = require('../dao/models/pet.model');

const router = Router();

router.get('/mockingpets', (req, res) => {
  const pets = generatePets(100);
  res.json({ status: 'success', payload: pets });
});

router.get('/mockingusers', (req, res) => {
  const users = generateUsers(50);
  res.json({ status: 'success', payload: users });
});

router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    if (isNaN(users) || isNaN(pets)) {
      return res.status(400).json({ status: 'error', message: 'Parámetros inválidos. Se esperan números.' });
    }

    const hashedPassword = await bcrypt.hash('coder123', 10);

    const usersToInsert = [];
    for (let i = 0; i < users; i++) {
      usersToInsert.push({
        first_name: `User${i}`,
        last_name: `Lastname${i}`,
        email: `user${i}@mail.com`,
        password: hashedPassword,
        role: Math.random() > 0.5 ? 'user' : 'admin',
        pets: [],
      });
    }
    const insertedUsers = await UserModel.insertMany(usersToInsert);

    const petsToInsert = [];
    for (let i = 0; i < pets; i++) {
      petsToInsert.push({
        name: `Pet${i}`,
        species: 'dog',
        age: Math.floor(Math.random() * 10 + 1),
      });
    }
    const insertedPets = await PetModel.insertMany(petsToInsert);

    res.json({
      status: 'success',
      insertedUsers: insertedUsers.length,
      insertedPets: insertedPets.length,
    });
  } catch (error) {
    console.error('Error al generar datos:', error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor.' });
  }
});

module.exports = router;
