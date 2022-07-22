import { Router } from 'express';

import { ProductsControllers } from '../../controllers/productsControllers';
import {
  validationPost,
  validationGetById,
  validationDelete,
  validationPut,
} from '../../utils/validations/products';

const productsController = new ProductsControllers();
const products = Router();

products.get('/', productsController.list);
products.get('/:id', validationGetById, productsController.listById);
products.post('/', validationPost, productsController.create);
products.put('/:id', validationPut, productsController.update);
products.delete('/:id', validationDelete, productsController.delete);

export { products };
