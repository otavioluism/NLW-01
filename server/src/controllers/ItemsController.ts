import {Request, Response} from 'express';
import knex from '../database/connection';

class ItemsController { 
  async index(request: Request, response: Response) { 

    // buscando todos os valores do BD items 
    const items = await knex('items').select('*');
  
    // processo de transformar as informacoes retornadas do BD
    const serealizedItems = items.map(item => { 
     return {
       id: item.id,
       title: item.title,
       image_url: `http://192.168.0.104:3333/uploads/${item.image}`,  
     };
    });
  
    return response.json(serealizedItems);
  
  }
}

export default ItemsController;