import express from 'express'

const app = express();

const port = 4500;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

app.get('/', async (req, res) => {
    res.send('Hello from the backend!');
  });