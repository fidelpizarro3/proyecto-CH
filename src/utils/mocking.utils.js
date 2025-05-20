const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const generateUsers = (amount = 1) => {
  const users = [];
  const hashedPassword = bcrypt.hashSync('coder123', 10);

  for (let i = 0; i < amount; i++) {
    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: Math.random() > 0.5 ? 'admin' : 'user',
      pets: [],
    });
  }

  return users;
};

const generatePets = (amount = 1) => {
  const pets = [];

  for (let i = 0; i < amount; i++) {
    pets.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.animal.dog(),
      species: 'dog',
      age: Math.floor(Math.random() * 10 + 1),
    });
  }

  return pets;
};

module.exports = { generateUsers, generatePets };
