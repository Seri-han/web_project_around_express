const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '682555d408a75a9b57f6c2d8' };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión:', err));

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
