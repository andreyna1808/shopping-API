import { instanceToInstance } from 'class-transformer'; // Fazer o password não aparecer no retorno
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUsersService } from '../services/users/createUsers';
import { DeleteUsersService } from '../services/users/deleteUsers';
import { ListUsersService } from '../services/users/listUsers';
import { UpdateUserAvatarService } from '../services/users/updateUserAvatar';
import { UpdateUsesService } from '../services/users/updateUsers';

class UsersControllers {
  async list(req: Request, res: Response) {
    const messageService = container.resolve(ListUsersService);
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const products = await messageService.list({ page, limit });
    return res.status(200).json(instanceToInstance(products));
  }

  async listById(req: Request, res: Response) {
    const messageService = container.resolve(ListUsersService);
    const { id } = req.params;

    const productById = await messageService.listById(id);
    return res.status(200).json(instanceToInstance(productById));
  }

  async create(req: Request, res: Response) {
    const messageService = container.resolve(CreateUsersService);

    const { name, email, password } = req.body;

    const createProduct = await messageService.create({
      name,
      email,
      password,
    });
    return res.status(201).json(instanceToInstance(createProduct));
  }

  async update(req: Request, res: Response) {
    const messageService = container.resolve(UpdateUsesService);

    const { name, email, password } = req.body;
    const { id } = req.params;

    const updateProduct = await messageService.update({
      id,
      name,
      email,
      password,
    });
    return res.json(instanceToInstance(updateProduct));
  }

  async UpdateAvatar(req: Request, res: Response) {
    const updateAvatarService = container.resolve(UpdateUserAvatarService);

    const updateAvatar = await updateAvatarService.updateAvatar({
      id: req.user.id,
      avatar: req.file.filename,
    });

    return res.json(updateAvatar);
  }

  async delete(req: Request, res: Response) {
    const messageService = container.resolve(DeleteUsersService);
    const { id } = req.params;

    await messageService.delete(id);
    return res.status(200).json({ message: 'product removed successfully' });
  }
}

export { UsersControllers };

/*
Routes Params: Parametros e rotas --- URL/:id
Query Params: Filtros e buscas ------ URL?page=10
Body Params: inserção, edição de dados ------ {dados no corpo JSON}
*/
