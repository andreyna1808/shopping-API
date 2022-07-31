import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const uploadFolder = path.resolve(__dirname, '..', 'uploads');

export const Upload = {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
