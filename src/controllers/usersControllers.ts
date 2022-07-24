import { instanceToInstance } from 'class-transformer'; // Fazer o password não aparecer no retorno
import { Request, Response } from 'express';

import { CreateUsersService } from '../services/users/createUsers';
import { DeleteUsersService } from '../services/users/deleteUsers';
import { ListUsersService } from '../services/users/listUsers';
import { UpdateUserAvatarService } from '../services/users/updateUserAvatar';
import { UpdateUsesService } from '../services/users/updateUsers';

class UsersControllers {
  async list(req: Request, res: Response) {
    const messageService = new ListUsersService();

    const products = await messageService.list();
    return res.status(200).json(instanceToInstance(products));
  }

  async listById(req: Request, res: Response) {
    const messageService = new ListUsersService();
    const { id } = req.params;

    const productById = await messageService.listById(id);
    return res.status(200).json(instanceToInstance(productById));
  }

  async create(req: Request, res: Response) {
    const messageService = new CreateUsersService();

    const { name, email, password } = req.body;

    const createProduct = await messageService.create({
      name,
      email,
      password,
    });
    return res.status(201).json(instanceToInstance(createProduct));
  }

  async update(req: Request, res: Response) {
    const messageService = new UpdateUsesService();

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
    const updateAvatarService = new UpdateUserAvatarService();

    const updateAvatar = await updateAvatarService.updateAvatar({
      id: req.user.id,
      avatar: req.file.filename,
    });

    return res.json(updateAvatar);
  }

  async delete(req: Request, res: Response) {
    const messageService = new DeleteUsersService();
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
