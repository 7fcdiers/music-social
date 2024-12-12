import { BaseSchema } from "@adonisjs/lucid/schema";

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.text('content').notNullable()
      table.integer('user_id').unsigned().references('uid').inTable('users').onDelete('CASCADE')
      table.integer('album_id').unsigned().nullable().references('uid').inTable('albums').onDelete('SET NULL')
      table.integer('track_id').unsigned().nullable().references('uid').inTable('tracks').onDelete('SET NULL')
      table.integer('concert_id').unsigned().nullable().references('uid').inTable('concerts').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
