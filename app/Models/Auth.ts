import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Auth extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (auth: Auth) {
    if (auth.$dirty.password) {
      auth.password =hashit Hash.make(auth.password)
    }
  }
}
