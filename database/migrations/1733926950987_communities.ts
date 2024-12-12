import { BaseSchema } from "@adonisjs/lucid/schema";

export default class Communities extends BaseSchema {
  protected tableName = 'communities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.string('name').notNullable().unique()
      table.text('description').notNullable()
      table.string('image_url').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
