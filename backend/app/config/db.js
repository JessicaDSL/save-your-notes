import sqlite3 from 'sqlite3';
import {fileURLToPath} from 'url'
import { resolve, dirname } from 'path'

// import dbPathDataBase from '../../../database/database-notes.db'

const __dirname = dirname(fileURLToPath(import.meta.url));


export async function initializateDB() {
 try {
  const dbPath = resolve(__dirname, '../../../database/database-notes.db');
  const db = new sqlite3.Database(dbPath)


  console.log('Banco de dados aberto com sucesso', db);
  return db;
 } catch (error) {
  console.error('Erro ao abrir o banco de dados:', error.message);
    throw error;
 }
};
