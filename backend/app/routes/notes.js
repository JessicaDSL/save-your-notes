import express from 'express';
import { initializateDB } from '../config/db.js';
import authenticate from '../auth/auth.js'

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const { title, message } = req.body;
  const user_id = req.user_id;

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
    const result = await db.run(query, [title, message, user_id, currentData]);
    res.status(201).json({id: result.lastID, title, message, user_id, data_createdAt: currentData})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
});

router.get('/', authenticate, async (req, res) => {
  const user_id = req.user_id;
  const query = 'SELECT * FROM notas WHERE user_id = ?';

  try {
    const db = await initializeDatabase();
    const notas = await db.all(query, [user_id]);
    res.status(200).json({notas})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
})

export default router;
