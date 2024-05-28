// const sqlite3 = require('sqlite3').verbose();
// import { sqlite3, Database } from "sqlite3";
import sqlite3 from 'sqlite3';


const db = new sqlite3.Database("../database-notes.db", (err) => {
  if (err) {
    console.error('Erro ao abrir o bando de dados', err.message);
  } else {
    console.log('Conexão bem sucedida')
  }
});

export default db;
