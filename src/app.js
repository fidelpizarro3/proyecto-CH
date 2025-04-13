import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/mocks', mocksRouter);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mockEntrega1')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));
