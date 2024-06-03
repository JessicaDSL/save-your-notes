import express from 'express';
import bcrypt from 'bcrypt';
import { initializateDB } from '../config/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, senha } = req.body;

  if (!username || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const hashPassword = bcrypt.hashSync(senha, 10);

  const query = `
    INSERT INTO users (username, email, senha)
    VALUES (?, ?, ?)
  `;

  try {
    const db = await initializateDB();
    db.run(query, [username, email, hashPassword]);
    res.status(201).json({ username, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// const db = await initializateDB();
// db.all('SELECT * FROM "users"', (err, rows) => {
//   if (err) {
//     console.error('Erro ao buscar as notas', err.message);
//     return;
//   }
//   console.log('Notas encontradas:', rows) 
// })

router.get('/', async(req, res) => {
  try {
    const db = await initializateDB();
    db.all('SELECT * FROM "users"', (err, rows) => {
      if (err) {
        console.error('Erro ao buscar os usuários', err.message);
        return;
      }
      console.log('Usuários encontradas:', rows) 
    })
  } catch (err) {
    console.error('Erro ao iniciar o banco de dados no user: ', err.message);
    res.status(500).json({error: 'Erro interno do servidor'})
  }
})


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  console.log(email)

  const query = `
    SELECT * FROM users WHERE email = ?
  `;

  try {
    const db = await initializateDB();
    
    db.get(query, [email], (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    
      if(!user) {
        return res.status(400).json({error: 'Todos os campos são obrigatorios'})
      }
      
      const passwHashed = bcrypt.compareSync(senha, user.senha);
      if(!passwHashed) {
        return res.status(401).json({error: "Credenciais inválidas"})
      }

      console.log('####user####', user);

      res.cookie('user_id', user.id, {httpOnly: true});
      res.json({message: 'Login bem sucedido!'})

    });
  } catch (err) {
    res.status(500).json({error: err.message})
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.json({message: 'Logout bem sucedido!'})
})

export default router;
