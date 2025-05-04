// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'users.json')),
);
const cards = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'cards.json')),
);

app.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(users);
});

app.get('/cards', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(cards);
});

// eslint-disable-next-line consistent-return
app.get('/users:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'ID de usuario no encontrado' });
  }
  res.json(user);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
