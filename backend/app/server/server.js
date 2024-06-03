import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';


const app = express();
const PORT = 4200;

// Middleware para analisar JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// db.all('SELECT * FROM "notas"', (err, rows) => {
//   if (err) {
//     console.error('Erro ao buscar as notas', err.message);
//     return;
//   }
//   console.log('Notas encontradas:', rows) 
// })

// db.all('SELECT * FROM "users"', (err, rows) => {
//   if(err) {
//     console.error('Erro ao encontrar usuarios', err.message);
//     return;
//   }
//   console.log('Usuarios encontrados: ', rows)
// })

app.post('/notas', (req, res) => {
  const { title, message, user_id } = req.body;

  if (!title || !message || !user_id) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  const query = `
    INSERT INTO notas (title, message, user_id, data_createdAt)
    VALUES (?, ?, ?, ?)
  `;

  const currentData = new Date().toISOString();

  db.run(query, [title, message, user_id, currentData], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, message, user_id,  data_createdAt: currentData });
  });
});

app.post('/register', (req, res) => {
  const {username, email, senha} = req.body;

  if (!username || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  const hashPassword = bcrypt.hashSync(senha, 10);

  const query = `
    INSERT INTO users (username, email, senha)
    VALUES (?, ?, ?)
  `;

  db.run(query, [username, email, hashPassword], function(err) {
    if(err) {
      return res.status(500).json({error: err.message})
    }
    res.status(201).json({  username, email})
  })
 

})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
