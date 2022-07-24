import { Router } from 'express';

import { UsersControllers } from '../../controllers/usersControllers';
import IsAuth from '../../middlewares/isAuth';
import { UploadUtils } from '../../utils/upload';
import {
  validationPost,
  validationGetById,
  validationDelete,
  validationPut,
} from '../../utils/validations/users';

const usersController = new UsersControllers();
const users = Router();

users.get('/', IsAuth, usersController.list);
users.get('/:id', validationGetById, usersController.listById);
users.post('/', validationPost, usersController.create);
users.put('/:id', validationPut, usersController.update);
users.delete('/:id', validationDelete, usersController.delete);
users.patch(
  '/avatar',
  IsAuth,
  UploadUtils.single('avatar'),
  usersController.UpdateAvatar,
);
// para o envio de arquivo vai ser o Multipart Form

export { users };

/* put --- muda tudo
  patch --- muda alguns arquivos
*/
