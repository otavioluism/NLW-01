import Knex from 'knex';

// Método Create
export async function up(knex: Knex){
  return knex.schema.createTable('items', table => { 
    table.increments('id').primary();        // coluna id 
    table.string('image').notNullable();     // coluna imagem
    table.string('title').notNullable();      // coluna titulo

  });
}

// Método Delete
export async function down(knex: Knex) {
  return knex.schema.dropTable('items');     //excluindo tabela
}