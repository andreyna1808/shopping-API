import { Router } from 'express';

import { UsersControllers } from '../../controllers/usersControllers';
import {
  validationPost,
  validationGetById,
  validationDelete,
  validationPut,
} from '../../utils/validations/users';

const usersController = new UsersControllers();
const users = Router();

users.get('/', usersController.list);
users.get('/:id', validationGetById, usersController.listById);
users.post('/', validationPost, usersController.create);
users.put('/:id', validationPut, usersController.update);
users.delete('/:id', validationDelete, usersController.delete);

export { users };
