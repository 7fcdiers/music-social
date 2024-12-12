import { BaseSchema } from "@adonisjs/lucid/schema";

export default class Albums extends BaseSchema {
  protected tableName = 'albums'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.string('title').notNullable()
      table.date('release_date').notNullable()
      table.string('cover_url').notNullable()
      table.string('genre').notNullable()
      table.integer('artist_id').unsigned().references('uid').inTable('artists').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
