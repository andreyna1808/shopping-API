import { Router } from 'express';

import { PasswordControllers } from '../../controllers/passwordControllers';
import { validationPassword } from '../../utils/validations/password';

const passwordController = new PasswordControllers();
const password = Router();

password.post('/forgot', passwordController.forgotPassword);
password.post('/reset', validationPassword, passwordController.resetPassword);

// para o envio de arquivo vai ser o Multipart Form

export { password };

/* put --- muda tudo
  patch --- muda alguns arquivos
*/
