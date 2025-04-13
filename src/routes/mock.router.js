import { Router } from 'express';
import { generateUsers, generatePets } from '../utils/mocking.utils.js';
import bcrypt from 'bcrypt';
import UserModel from '../dao/models/user.model.js';
import PetModel from '../dao/models/pet.model.js';

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
  const { users = 0, pets = 0 } = req.body;

  const hashedPassword = await bcrypt.hash('coder123', 10);

  let usersCreated = [];
  for (let i = 0; i < users; i++) {
    const user = new UserModel({
      first_name: `User${i}`,
      last_name: `Lastname${i}`,
      email: `user${i}@mail.com`,
      password: hashedPassword,
      role: Math.random() > 0.5 ? 'user' : 'admin',
      pets: [],
    });
    usersCreated.push(await user.save());
  }

  let petsCreated = [];
  for (let j = 0; j < pets; j++) {
    const pet = new PetModel({
      name: `Pet${j}`,
      species: 'dog',
      age: Math.floor(Math.random() * 10 + 1),
    });
    petsCreated.push(await pet.save());
  }

  res.json({
    status: 'success',
    insertedUsers: usersCreated.length,
    insertedPets: petsCreated.length,
  });
});

export default router;
