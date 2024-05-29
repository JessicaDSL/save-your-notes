import express from 'express';
import db from '../config/db.js'

const app = express();
const PORT = 4200;

// Middleware para analisar JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

db.all('SELECT * FROM "notas"', (err, rows) => {
  if (err) {
    console.error('Erro ao buscar as notas', err.message);
    return;
  }
  console.log('Notas encontradas:', rows)
})

app.post('/notas', (req, res) => {kl
  const { title, message, user_id } = req.body;

  if (!title || !message || !user_id) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  const query = `
    INSERT INTO notas (title, message, user_id)
    VALUES (?, ?, ?)
  `;

  db.run(query, [title, message, user_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, message, user_id, data_createdAt: new Date() });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
