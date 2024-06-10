import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

 // Enable CORS for all routes

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

const dummyUsers = [
  { username: 'test', password: 'test' }
];

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // DB Abfrage noch Implementieren
  const user = dummyUsers.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

console.log("hallo");

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
//   console.log('Connected to the database as id', db.threadId);
// });

// app.get('/', async (req, res) => {
//   // Basic database query to test the connection
//   db.query('SELECT * FROM users', (err, results, fields) => {
//     if (err) {
//       console.error('Error executing query:', err.stack);
//       res.status(500).send('Error executing query');
//       return;
//     }
//     console.log('Query results:', results);
//     res.json(results);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

