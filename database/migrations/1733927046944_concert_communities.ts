import { BaseSchema } from "@adonisjs/lucid/schema";

export default class ConcertCommunity extends BaseSchema {
  protected tableName = 'concert_community'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('concert_id').unsigned().references('uid').inTable('concerts').onDelete('CASCADE')
      table.integer('community_id').unsigned().references('uid').inTable('communities').onDelete('CASCADE')
      table.primary(['concert_id', 'community_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
