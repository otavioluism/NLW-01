import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'sqlite3',  // qual banco de dados vai usar
  connection: { 
    filename: path.resolve(__dirname, 'database.sqlite'), // onde esta o arquivo que o sqlite cria
  },
  useNullAsDefault: true,
});

export default connection;