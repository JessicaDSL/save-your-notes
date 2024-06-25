// import express from 'express';
// import cookieParser from 'cookie-parser';
// import { initializateDB } from './config/db.js';
// import userRoutes from './routes/users.js';
// import noteRoutes from './routes/notes.js';
// import { setupSwagger } from './swagger/swagger.js';
// // import './env'
// // import dotenv from 'dotenv';
// // import 'dotenv/config'
// // dotenv.config();

// // require("dotenv").config();

// import dotenv from "dotenv";
// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// setupSwagger(app);


// app.use('/user', (req, res, next) => {
//   console.log('Requisição para /users:', req.method, req.originalUrl);
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.use('/users', userRoutes);
// app.use('/notes', noteRoutes)

// export { app, initializateDB };
