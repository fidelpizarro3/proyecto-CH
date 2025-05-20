// app.js
const express = require('express');
const mongoose = require('mongoose');
const mocksRouter = require('./src/routes/mocks.router');
const usersRouter = require('./src/routes/users.router');
const petsRouter = require('./src/routes/pets.router');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');

const app = express();
const PORT = 3000;

const adoptionRouter = require('./src/routes/adoption.router');
app.use('/api/adoptions', adoptionRouter);

app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

mongoose.connect('mongodb://localhost:27017/mockEntrega1')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));
