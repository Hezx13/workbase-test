import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import todosRouter from './routers/todosRouter';
import cors from 'cors';

const app = express();

const port = 4500;


app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:5173']
}));

app.use('/todos', todosRouter);

app.get('/', async (req, res) => {
  res.send('BACKEND WORKS!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});