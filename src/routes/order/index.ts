import { Router } from 'express';

import { OrdersControllers } from '../../controllers/orderControllers';
import IsAuth from '../../middlewares/isAuth';

const ordersController = new OrdersControllers();
const orders = Router();

orders.use(IsAuth);
orders.get('/:id', ordersController.list);
orders.post('/', ordersController.create);

export { orders };

/* put --- muda tudo
  patch --- muda alguns arquivos
*/
