import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer'; // upload de arquivos
import multerConfig from './config/multer';


import PointsController from './controllers/PointsCotroller';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

// criando uma instacia da classe
const pointsController = new PointsController();
const itemsController = new ItemsController();

// --------------------------- Rotas ----------------

// Listar os items 
routes.get('/items', itemsController.index);

// Criar Pontos com seus determinados items
routes.post(
  '/points', 
  upload.single('image'), 
  celebrate({
    body: Joi.object().keys({ 
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp:  Joi.number().required(),
      latitude:  Joi.number().required(),
      longitude:  Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, { 
    abortEarly: false
  }),
  pointsController.create
);

// Listar os items 
routes.get('/points', pointsController.index);

// Listar um ponto especifico de coleta 
routes.get('/points/:id', pointsController.show);


export default routes;