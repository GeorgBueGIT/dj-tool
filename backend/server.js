import express from 'express';
// import fetch from 'node-fetch';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log("hallo");

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', db.threadId);
});

app.get('/', async (req, res) => {
  // Basic database query to test the connection
  db.query('SELECT * FROM users', (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    console.log('Query results:', results);
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
