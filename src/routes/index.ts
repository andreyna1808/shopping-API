import { Router } from 'express';

import { products } from './products';

const routes = Router();

routes.get('/', (req, res) => {
  res.json('Hello Dev');
});

routes.use('/products', products);

export { routes };
