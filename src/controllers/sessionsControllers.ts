import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import { CreateSessionService } from '../services/sessions/createSession';

class SessionsControllers {
  async createSession(req: Request, res: Response) {
    const createSessionService = new CreateSessionService();

    const { email, password } = req.body;

    const createSession = await createSessionService.createSession({
      email,
      password,
    });
    return res.status(201).json(instanceToInstance(createSession));
  }
}

export { SessionsControllers };

/*
Routes Params: Parametros e rotas --- URL/:id
Query Params: Filtros e buscas ------ URL?page=10
Body Params: inserção, edição de dados ------ {dados no corpo JSON}
*/
