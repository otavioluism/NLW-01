import {Request, Response} from 'express';
import knex from '../database/connection';


class PointsController { 
  // Criar um ponto para coleta
  async create(request: Request, response: Response) { 
    const { 
      name, 
      email, 
      whatsapp, 
      latitude, 
      longitude, 
      city, 
      uf,
      items
    } = request.body;
  
    // variavel utilizada para que uma funcao dependa da outra, ou seja, se uma nao executar a outra tambem nao ira
    const trx = await knex.transaction();
    
    const point = { 
      image: request.file.filename,
      name,
      email, 
      whatsapp, 
      latitude, 
      longitude, 
      city, 
      uf
    };

    // retorna o id 
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItems = items
       .split(',')
       .map((item: string) => Number(item.trim()))
       .map((item_id: number) => { 
      return{
        item_id,
        point_id,
      };
    });
  
    // associando os items com o ponto de reciclagem
    await trx('point_items').insert(pointItems);

    // vai realizar os insert na tabela de dados
    await trx.commit();
  
    return response.json({ 
      id: point_id,
      ...point, 
     })
  
  }

  // Mostrar um único ponto de coleta
  async show(request: Request, response: Response){ 
      const { id } = request.params;

      // procure na tabela points onde o id tenha o number do id e pegue o primeiro
      const point = await knex('points').where('id', id).first();

      if(!point){
        return response.status(400).json({message: 'Point not found.' });
      }

      const serializedPoint = {
        ...point,
        image_url: `http://192.168.0.104:3333/uploads/${point.image}`
    };

      // listar todos os items que tem relacao com esse ponto de coleta
      const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
       

      return response.json({ 
        point: serializedPoint, 
        items
      });
  }

  // Mostrar todos os pontos da coleta por meio de filtros
  async index(request: Request, response: Response){
    const { city, uf, items } = request.query;

    // ajeitando os numeros do id dos items que vem pelo query
    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item.trim()));

    //filtros
    const points = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf',String(uf))
    .distinct()  // retorna somente pontos de coleta distintos
    .select('points.*');

    const serializedPoints = points.map(point => {
      return { 
        ...point,
        image_url: `http://192.168.0.104:3333/uploads/${point.image}`
      }
    });

    return response.json(serializedPoints)
  }
}

export default PointsController;