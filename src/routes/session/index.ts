import { Router } from 'express';

import { SessionsControllers } from '../../controllers/sessionsControllers';
import { validationPost } from '../../utils/validations/sessions';

const sessionController = new SessionsControllers();
const session = Router();

session.post('/', validationPost, sessionController.createSession);

export { session };
