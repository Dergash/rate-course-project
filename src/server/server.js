import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;

console.log(`> Starting API server at port ${port}`);

app.post('/projects/', (req, res) => {
  console.log('New request');
  res.sendStatus(200);
});

app.listen(port);
