import express from 'express';
import { initializateDB } from '../config/db.js';
import authenticate from '../auth/auth.js'

const router = express.Router();

router.post('/new-note', authenticate, async (req, res) => {
  const { title, message } = req.body;
  const user_id = req.user.id;
  console.log('######user id######', req.user.id)

  if(!title || !message) {
    res.status(400).json({error: 'Todos os campos são necessários!'})
  }

  const query = `
    INSERT INTO notas (title, message, user_id, data_createdAt)
    VALUES (?, ?, ?, ?)
  `;

  const currentData = new Date().toISOString();

  try {
    const db = await initializateDB();
    const result = db.run(query, [title, message, user_id, currentData]);
    res.status(201).json({id: result.lastID, title, message, user_id, data_createdAt: currentData})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
});

router.get('/', authenticate, async (req, res) => {
  const user_id = 6;
  const query = 'SELECT * FROM notas WHERE user_id = ?';

  try {
    const db = await initializateDB();
    const notas = db.all(query, [user_id]);
    res.status(200).json({notas})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
})

router.get('/note-by-user', authenticate, async (req, res) => {
  console.log(req.query.offset)
  const user_id =  req.user.id;
  let offset = parseInt(req.query.offset) || 0;
  let limit = parseInt(req.query.limit) || 10;

  if(limit > 10 ) {
    limit = 10;
  } else if (limit < 1) {
    limit = 1
  }

  try {
    const db = await initializateDB();
    db.all('SELECT * FROM notas WHERE user_id = ? LIMIT ? OFFSET ?', [user_id, limit, offset], (err, rows) => {
      if(err) {
        console.error('Erro ao buscar notas: ', err.message);
        return res.status(500).json({error: 'Erro ao buscar as notas'});
      }

      db.get('SELECT COUNT(*) AS count FROM notas WHERE user_id = ?', [user_id], (err, result) => {
        if(err) {
          console.error('Erro ao buscar notas: ', err.message);
          return res.status(500).json({error: 'Erro ao buscar as notas'});
        }
        console.log('result: ', result, 'rows: ', rows)
        const response = {
          offset: offset,
          limit: limit,
          total_notes: result.count,
          notes: rows
        }
        console.log('user id', user_id)
        res.status(200).json({response})
      })
      
    })
  } catch (err) {
    console.error('Erro ao iniciar o banco de dados:', err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

export default router;
