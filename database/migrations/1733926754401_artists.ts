import { BaseSchema } from "@adonisjs/lucid/schema";

export default class Artists extends BaseSchema {
  protected tableName = 'artists'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.string('name').notNullable()
      table.text('bio').notNullable()
      table.string('image_url').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
