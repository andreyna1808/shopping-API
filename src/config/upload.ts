import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const uploadFolder = path.resolve(__dirname, '..', 'uploads'); // determina o caminho para encontrar o local atual atrás da pasta uploads para armazenar a imagem

export const Upload = {
  directory: uploadFolder, // define o diretório
  storage: multer.diskStorage({
    // armazenar no disco de um servidor diskStorage
    destination: uploadFolder, // em qual pasta vai salvar
    filename(req, file, callback) {
      // De que forma vai compor o nome do arquivo, como vai ser armazenado para não ter arquivos com nomes repetidos
      const fileHash = crypto.randomBytes(10).toString('hex'); // Vai criar um hash, valor 10 para a criação do hash e hexadecimal
      const filename = `${fileHash}-${file.originalname}`; // primeira parte do nome é o hash e o outro é o nome origial do arquivo
      // Dessa forma fica quase impossível ter nomes repetidos

      callback(null, filename); // primeiro retorna o erro e o segundo executa o arquivo
    },
  }),
};
