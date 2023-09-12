const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: $(POSTGRESQL_ADDON_USER),
  host: $(POSTGRESQL_ADDON_HOST),
  database: $(POSTGRESQL_ADDON_DB),
  password: $(POSTGRESQL_ADDON_DB),
  port: $(POSTGRESQL_ADDON_PORT)
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
