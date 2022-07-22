import { Request, Response } from 'express';

import { CreateProductsService } from '../services/products/createProducts';
import { DeleteProductsService } from '../services/products/deleteProducts';
import { ListProductsService } from '../services/products/listProducts';
import { UpdateProductsService } from '../services/products/updateProducts';

class ProductsControllers {
  async list(req: Request, res: Response) {
    const messageService = new ListProductsService();

    const products = await messageService.list();
    return res.status(200).json(products);
  }

  async listById(req: Request, res: Response) {
    const messageService = new ListProductsService();
    const { id } = req.params;

    const productById = await messageService.listById(id);
    return res.status(200).json(productById);
  }

  async create(req: Request, res: Response) {
    const messageService = new CreateProductsService();

    const { name, price, quantity } = req.body;

    const createProduct = await messageService.create({
      name,
      price,
      quantity,
    });
    return res.status(201).json(createProduct);
  }

  async update(req: Request, res: Response) {
    const messageService = new UpdateProductsService();

    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = await messageService.update({
      id,
      name,
      price,
      quantity,
    });
    return res.json(updateProduct);
  }

  async delete(req: Request, res: Response) {
    const messageService = new DeleteProductsService();
    const { id } = req.params;

    await messageService.delete(id);
    return res.status(200).json({ message: 'product removed successfully' });
  }
}

export { ProductsControllers };
