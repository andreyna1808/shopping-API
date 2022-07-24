import express, { Router } from 'express';

import { Upload } from '../config/upload';
import { custom } from './customers';
import { password } from './password';
import { products } from './products';
import { profile } from './profile';
import { session } from './session';
import { users } from './users';

const routes = Router();

routes.get('/', (req, res) => {
  res.json('Hello Dev');
});

routes.use('/products', products);
routes.use('/users', users);
routes.use('/sessions', session);
routes.use('/password', password);
routes.use('/profile', profile);
routes.use('/custom', custom);
routes.use('/files', express.static(Upload.directory)); // rota estática com os arquivos que serão acessados, pega todo o conteúdo do uploads

export { routes };
