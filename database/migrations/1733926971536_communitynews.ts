import { BaseSchema } from "@adonisjs/lucid/schema";

export default class CommunityNews extends BaseSchema {
  protected tableName = 'community_news'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.integer('user_id').unsigned().references('uid').inTable('users').onDelete('CASCADE')
      table.integer('community_id').unsigned().references('uid').inTable('communities').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
