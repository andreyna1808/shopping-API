import { Request, Response } from 'express';

import { ShowProfileService } from '../services/users/showProfileService';
import { UpdateProfileService } from '../services/users/updateProfileService';

class ProfileControllers {
  async listUser(req: Request, res: Response) {
    const messageService = new ShowProfileService();
    const { id } = req.user;

    const products = await messageService.showProfile(id);
    return res.status(200).json(products);
  }

  async updateUser(req: Request, res: Response) {
    const messageService = new UpdateProfileService();

    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProduct = await messageService.updateProfile({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return res.json(updateProduct);
  }
}

export { ProfileControllers };

/*
Routes Params: Parametros e rotas --- URL/:id
Query Params: Filtros e buscas ------ URL?page=10
Body Params: inserção, edição de dados ------ {dados no corpo JSON}
*/
