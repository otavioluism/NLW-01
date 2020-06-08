import Knex from 'knex';

// Método Create
export async function up(knex: Knex){
  return knex.schema.createTable('points', table => { 
    table.increments('id').primary();        // coluna id 
    table.string('image').notNullable();     // coluna imagem
    table.string('name').notNullable();      // coluna nome
    table.string('email').notNullable();     // coluna email
    table.string('whatsapp').notNullable();  // coluna whatsapp
    table.decimal('latitude').notNullable(); // coluna latitude
    table.decimal('longitude').notNullable(); // coluna longitude
    table.string('city').notNullable();       // coluna city
    table.string('uf', 2).notNullable();      // coluna uf

  })
}

// Método Delete
export async function down(knex: Knex) {
  return knex.schema.dropTable('points');     //excluindo tabela
}