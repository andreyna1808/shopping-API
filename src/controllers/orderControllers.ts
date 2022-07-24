import { Request, Response } from 'express';

import CreateOrderService from '../services/order/createOrder';
import ListOrderService from '../services/order/listOrder';

class OrdersControllers {
  async list(req: Request, res: Response) {
    const messageService = new ListOrderService();

    const { id } = req.params;

    const products = await messageService.list(id);
    return res.status(200).json(products);
  }

  async create(req: Request, res: Response) {
    const messageService = new CreateOrderService();

    const { id, products } = req.body;

    const createProduct = await messageService.create({
      id,
      products,
    });
    return res.status(201).json(createProduct);
  }
}

export { OrdersControllers };

/*
Routes Params: Parametros e rotas --- URL/:id
Query Params: Filtros e buscas ------ URL?page=10
Body Params: inserção, edição de dados ------ {dados no corpo JSON}
*/
