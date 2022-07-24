import { Request, Response } from 'express';

import { ResetPasswordService } from '../services/password/resetPassword';
import { SendForgotPasswordService } from '../services/password/SendForgotPassword';

class PasswordControllers {
  async forgotPassword(req: Request, res: Response) {
    const forgotPasswordSession = new SendForgotPasswordService();

    const { email } = req.body;

    const dataUserToken = await forgotPasswordSession.forgotPassword(email);

    return res.status(200).json(dataUserToken);
  }

  async resetPassword(req: Request, res: Response) {
    const createSessionService = new ResetPasswordService();

    const { token, password } = req.body;

    const resetPassword = await createSessionService.resetPassword({
      token,
      password,
    });
    return res.status(200).json(resetPassword);
  }
}

export { PasswordControllers };

/*
Routes Params: Parametros e rotas --- URL/:id
Query Params: Filtros e buscas ------ URL?page=10
Body Params: inserção, edição de dados ------ {dados no corpo JSON}
*/
