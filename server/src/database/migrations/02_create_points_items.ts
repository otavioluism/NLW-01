import Knex from 'knex';

// Método Create
export async function up(knex: Knex){
  return knex.schema.createTable('point_items', table => { 
    
    table.increments('id').primary();        // coluna id 

    table.integer('point_id')                // coluna id dos pontos 
      .notNullable()
      .references('id')
      .inTable('points');

    table.integer('item_id')                  // coluna id dos items
    .notNullable()
    .references('id')
    .inTable('items');      

  });
}

// Método Delete
export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items');     //excluindo tabela
}