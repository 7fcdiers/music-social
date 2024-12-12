import { BaseSchema } from "@adonisjs/lucid/schema";

export default class Concerts extends BaseSchema {
  protected tableName = 'concerts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.dateTime('date').notNullable()
      table.string('venue').notNullable()
      table.string('address').notNullable()
      table.decimal('latitude', 10, 7).notNullable()
      table.decimal('longitude', 10, 7).notNullable()
      table.string('ticket_url').nullable()
      table.integer('album_id').unsigned().nullable().references('uid').inTable('albums').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
