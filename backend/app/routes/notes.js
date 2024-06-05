import express from 'express';
import { initializateDB } from '../config/db.js';
import authenticate from '../auth/auth.js'

const router = express.Router();

/**
 *@swagger
 *tags:
 *  name: Notas
 *  description: Gerenciamento de Notas
 */

/**
 * @swagger
 * /notes/new-note:
 *   post:
 *    summary: Cria uma nova nota
 *    tags: [Notas]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - message
 *           properties:
 *             title:
 *               type: string
 *             message:
 *               type: string
 *    responses:
 *     201:
 *       description: Nota criada com sucesso.
 *     400:
 *       description: Erro nos campos da requisição
 *     500:
 *       description: Erro interno do servidor
 *     401:
 *       description: Usuário nao identificado
 */

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


/**
 * @swagger
 * /notes/notes-by-user:
 *  get:
 *    summary: Lista as notas do usuário com paginação, limite de 10 notas por página
 *    tags: [Notas]
 *    parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *        description: Numero de notas a pular para a exibição
 *      - in: query
 *        name: limit
 *        schema:
 *          type:
 *            integer
 *          description: Número de notas a serem exibidas
 *    responses:
 *      200:
 *        description: Lista de notas paginadas
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              proprieties:
 *                offset:
 *                  type: integer
 *                limit:
 *                  type: integer
 *                total_notes:
 *                  type: integer
 *                notes:
 *                  type: array
 *                  items:
 *                    type: object
 *                    propieties:
 *                      id:
 *                        type: integer
 *                      title:
 *                        type: string
 *                      message: 
 *                        type: string
 *                      user_id:
 *                        type: integer
 *                      data_createdAt:
 *                        type: string
 *                        format: date-time
 *      500:
 *        description: Erro interno do servidor 
 */

router.get('/notes-by-user', authenticate, async (req, res) => {
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
