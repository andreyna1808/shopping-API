import multer from 'multer';

import { Upload } from '../config/upload';

export const UploadUtils = multer(Upload); // pega o upload com a insntância do multer as configurações já definidas
