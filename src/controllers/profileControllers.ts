import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProfileService } from '../services/users/showProfileService';
import { UpdateProfileService } from '../services/users/updateProfileService';

class ProfileControllers {
  async listUser(req: Request, res: Response) {
    const messageService = container.resolve(ShowProfileService);
    const { id } = req.user;

    const products = await messageService.showProfile(id);
    return res.status(200).json(products);
  }

  async updateUser(req: Request, res: Response) {
    const messageService = container.resolve(UpdateProfileService);

    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProduct = await messageService.updateProfile({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return res.json(instanceToInstance(updateProduct));
  }
}

export { ProfileControllers };
