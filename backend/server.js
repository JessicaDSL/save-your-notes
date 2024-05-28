import express from 'express';

const app = express();
const PORT = 4200;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
});
