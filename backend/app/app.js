import express from 'express';
import cookieParser from 'cookie-parser';
import { initializateDB } from './config/db.js';
import userRoutes from './routes/users.js';
import noteRoutes from './routes/notes.js';

const app = express();
const PORT = 4200;

app.use(express.json());
app.use(cookieParser());

app.use('/user', (req, res, next) => {
  console.log('Requisição para /users:', req.method, req.originalUrl);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/notes', noteRoutes)


initializateDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao inicializar o banco de dados:', err.message);
});
