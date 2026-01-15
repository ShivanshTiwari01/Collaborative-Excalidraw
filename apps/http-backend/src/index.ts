import express from 'express';
import { JWT_SECRET } from '@repo/backend-common/config';

const app = express();

const PORT = 3001;

app.post('/signup', (req, res) => {});

app.post('/signin', (req, res) => {});

app.post('/room', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
