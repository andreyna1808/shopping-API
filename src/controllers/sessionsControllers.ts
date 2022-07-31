import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionService } from '../services/sessions/createSession';

class SessionsControllers {
  async createSession(req: Request, res: Response) {
    const createSessionService = container.resolve(CreateSessionService);

    const { email, password } = req.body;

    const createSession = await createSessionService.createSession({
      email,
      password,
    });
    return res.status(201).json(instanceToInstance(createSession));
  }
}

export { SessionsControllers };
