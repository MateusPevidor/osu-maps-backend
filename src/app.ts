import express from 'express';

/* eslint-disable */

import dotenv from 'dotenv';
dotenv.config();

import beatmaps from './routes/beatmaps.routes';

/* eslint-enable */

const app = express();

const port = process.env.PORT || 3333;

app.use(express.json());
app.use('/beatmaps', beatmaps);

app.listen(port, () => {
  console.log(`🔥 Server started on port ${port}`);
});
