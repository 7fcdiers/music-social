import { BaseSchema } from "@adonisjs/lucid/schema";

export default class Tracks extends BaseSchema {
  protected tableName = 'tracks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.string('title').notNullable()
      table.integer('duration').notNullable()
      table.integer('artist_id').unsigned().references('uid').inTable('artists').onDelete('CASCADE')
      table.integer('album_id').unsigned().nullable().references('uid').inTable('albums').onDelete('SET NULL')
      table.string('spotify_id').nullable()
      table.string('deezer_id').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
