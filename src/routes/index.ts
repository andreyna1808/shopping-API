import { Router } from 'express';

import { products } from './products';
import { users } from './users';

const routes = Router();

routes.get('/', (req, res) => {
  res.json('Hello Dev');
});

routes.use('/products', products);
routes.use('/users', users);

export { routes };
