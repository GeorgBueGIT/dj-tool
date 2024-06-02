import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://songbpm.com/@kenji-hina/bring-it-down-wUzzdEvIrS');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.text();
    res.send(data);
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
