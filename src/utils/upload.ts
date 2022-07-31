import multer from 'multer';

import { Upload } from '../config/upload';

export const UploadUtils = multer(Upload);
