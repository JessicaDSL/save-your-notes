import express from 'express';
import cookieParser from 'cookie-parser';
import { initializateDB } from '../backend/app/config/db.js';
import userRoutes from '../backend/app/routes/users.js';
import noteRoutes from '../backend/app/routes/notes.js';
import { setupSwagger } from '../backend/app/swagger/swagger.js';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT;
console.log(PORT)

const app = express();

app.use(express.json());
app.use(cookieParser());

setupSwagger(app);


app.use('/users', (req, res, next) => {
  console.log('Requisição para /users:', req.method, req.originalUrl);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

initializateDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao inicializar o banco de dados:', err.message);
});

// export { app, initializateDB };
