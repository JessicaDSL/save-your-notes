import db from '../config/db.js'

db.all('SELECT * FROM "notas"', (err, rows) => {
  if (err) {
    console.error('Erro ao buscar as notas', err.message);
    return;
  }
  console.log('Notas encontradas:', rows)
})