/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { errors } from 'celebrate'; // caso seja gerado erro na validação
import cors from 'cors';
import express from 'express';

import './database';
import 'express-async-errors';
import { routes } from './routes';
import { AppError } from './utils/appError';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/', routes);

app.use(errors());

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    console.log('Entrei no erro');
    return res.status(err.statusCode).json(err.message);
  }
  console.log('Entrei no erro', err);
  return res.status(500).json({ message: 'Internal server error', more: err });
});

export { app };
