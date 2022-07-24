import { Router } from 'express';

import { ProfileControllers } from '../../controllers/profileControllers';
import IsAuth from '../../middlewares/isAuth';
import { validationProfile } from './validation';

const profileController = new ProfileControllers();
const profile = Router();

profile.get('/', IsAuth, profileController.listUser);
profile.put('/', IsAuth, validationProfile, profileController.updateUser);

export { profile };

/* put --- muda tudo
  patch --- muda alguns arquivos
*/
