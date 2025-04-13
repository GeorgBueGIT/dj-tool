import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes.js';
import uploadimage from './UploadImage.js';
import uploadtest from './uploadTest.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors());

app.use(bodyParser.json());
app.use('/api', routes);
app.use('/upload', uploadimage);
app.use('/uploadtest', uploadtest);

export default app;