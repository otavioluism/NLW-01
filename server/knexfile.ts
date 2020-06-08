import path from 'path';

module.exports = { 
  client: 'sqlite3',  // qual banco de dados vai usar
  connection: { 
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'), // onde esta o arquivo que o sqlite cria
  },
  migrations: { 
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')   // caminho para buscar o historico do banco de dados
  },
  seeds: { 
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')     // configuracao para buscar algo estabelecido
  }, 
  useNullAsDefault: true,
};