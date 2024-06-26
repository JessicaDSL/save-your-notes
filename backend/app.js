import express from 'express';
import cookieParser from 'cookie-parser';
import { initializateDB } from '../backend/app/config/db.js';
import userRoutes from '../backend/app/routes/users.js';
import noteRoutes from '../backend/app/routes/notes.js';
import { setupSwagger } from '../backend/app/swagger/swagger.js';
import dotenv from 'dotenv';
import redis from 'redis';
import expressRedisCache from 'express-redis-cache';
dotenv.config();

const REDIS_URL = process.env.REDIS_URL;
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

const redisCliente = redis.createClient({ url: REDIS_URL});
const cache = expressRedisCache({
  client: redisCliente,
  prefix: 'notes',
  expire: 3600
})

redisCliente.on('error', (err) => {
  console.error('Erro ao conectar ao Redis', err);
});

redisCliente.on('connect', () => {
  console.log('Conectado ao Redis');
});

app.use('/notes', cache.route());

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
