const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'si5_sacc',
  host: 'database',
  database: 'td_1',
  password: 'dev_password',
  port: 5432
});

let visitCount = 0;

app.get('/', async (req, res) => {
  visitCount++;
  try {
    const client = await pool.connect();

    const result = await client.query('INSERT INTO visits (count) VALUES ($1)', [visitCount]);
    client.release();
  } catch (err) {
    console.error(err);
  }
  res.send(`Nombre de visites : ${visitCount}`);
});

app.listen(8080, () => {
  console.log('Serveur en écoute sur le port 8080');
});
