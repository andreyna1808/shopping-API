import { Router } from 'express';

import { CustomControllers } from '../../controllers/customControllers';
import IsAuth from '../../middlewares/isAuth';

const customController = new CustomControllers();
const custom = Router();

custom.use(IsAuth);
custom.get('/', customController.list);
custom.get('/:id', customController.listById);
custom.post('/', customController.create);
custom.put('/:id', customController.update);
custom.delete('/:id', customController.delete);

export { custom };
