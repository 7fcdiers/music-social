import { BaseSchema } from "@adonisjs/lucid/schema";

export default class CommunityUser extends BaseSchema {
  protected tableName = 'community_user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('community_id').unsigned().references('uid').inTable('communities').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('uid').inTable('users').onDelete('CASCADE')
      table.primary(['community_id', 'user_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
