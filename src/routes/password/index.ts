import { Router } from 'express';

import { PasswordControllers } from '../../controllers/passwordControllers';
import { validationPassword } from '../../utils/validations/password';

const passwordController = new PasswordControllers();
const password = Router();

password.post('/forgot', passwordController.forgotPassword);
password.post('/reset', validationPassword, passwordController.resetPassword);

export { password };
