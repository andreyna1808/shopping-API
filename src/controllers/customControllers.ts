import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomService } from '../services/customers/createCustom';
import { DeleteCustomService } from '../services/customers/deleteCustom';
import { ListCustomerService } from '../services/customers/listCustom';
import { UpdateCustomService } from '../services/customers/updateCustom';

class CustomControllers {
  async list(req: Request, res: Response) {
    const messageService = container.resolve(ListCustomerService);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const products = await messageService.list({ page, limit });
    return res.status(200).json(products);
  }

  async listById(req: Request, res: Response) {
    const messageService = container.resolve(ListCustomerService);
    const { id } = req.params;

    const productById = await messageService.listById(id);
    return res.status(200).json(productById);
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const messageService = container.resolve(CreateCustomService);

    const createProduct = await messageService.create({
      name,
      email,
    });
    return res.status(201).json(createProduct);
  }

  async update(req: Request, res: Response) {
    const messageService = container.resolve(UpdateCustomService);

    const { name, email } = req.body;
    const { id } = req.params;

    const updateProduct = await messageService.update({
      id,
      name,
      email,
    });
    return res.json(updateProduct);
  }

  async delete(req: Request, res: Response) {
    const messageService = container.resolve(DeleteCustomService);
    const { id } = req.params;

    await messageService.delete(id);
    return res.status(200).json({ message: 'custom removed successfully' });
  }
}

export { CustomControllers };

/*
Routes Params: Parametros e rotas --- URL/:id
Query Params: Filtros e buscas ------ URL?page=10
Body Params: inserção, edição de dados ------ {dados no corpo JSON}
*/
