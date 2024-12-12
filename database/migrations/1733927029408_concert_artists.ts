import { BaseSchema } from "@adonisjs/lucid/schema";

export default class ConcertArtist extends BaseSchema {
  protected tableName = 'concert_artist'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('concert_id').unsigned().references('uid').inTable('concerts').onDelete('CASCADE')
      table.integer('artist_id').unsigned().references('uid').inTable('artists').onDelete('CASCADE')
      table.primary(['concert_id', 'artist_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
