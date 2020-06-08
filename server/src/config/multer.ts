import multer from 'multer'; // para trabalhar com upload de arquivos 
import path from 'path';     // para trabalhar com os caminhos 
import crypto from 'crypto';

export default { 
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex'); // criando um nome aleatorio para por no nome do arquivo

      const fileName = `${hash}-${file.originalname}`; // nome do arquivo

      callback(null, fileName);
    }
  }),
}  