import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('modules', table => {
    table.bigIncrements('id').primary();
    table.bigInteger('course_id').unsigned().notNullable().references('id').inTable('courses').onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('slug').notNullable();
    table.text('description').notNullable();
    table.text('content').nullable();
    table.integer('order').notNullable().defaultTo(0);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('deleted_at', { useTz: true }).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('modules');
}
