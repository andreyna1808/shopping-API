import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../swagger.json';
import { custom } from './customers';
import { orders } from './order';
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
routes.use('/orders', orders);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export { routes };
