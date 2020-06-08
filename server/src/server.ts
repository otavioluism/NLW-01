import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

// variavel app recebe todos os tipos da funcao express
const app = express();

// permite que qualquer URL acesse nossa API
app.use(cors());

// coloque na aplicacao o formato json para entendimento das rotas para criacao e atualizacao de informacoes
app.use(express.json())

// todas as routas estao sendo usadas ou seja aqui dentro
app.use(routes);

// buscando o caminho para mostrar as imagens
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// lidar com a forma de tratar os erros no front-end
app.use(errors());

// Listen server
app.listen(3333, () => {
  console.log("Init Server on localhost:3333 🚀 ")
});