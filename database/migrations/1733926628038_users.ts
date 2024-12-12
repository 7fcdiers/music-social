import { BaseSchema } from "@adonisjs/lucid/schema";

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid')
      table.string('email').notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.string('avatar_url').nullable()
      table.string('provider').nullable()
      table.string('provider_id').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
