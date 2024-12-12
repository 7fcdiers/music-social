import hash from '@adonisjs/core/services/hash'
import {
  BaseModel,
  beforeSave,
  column,
  hasMany
} from  '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import ApiToken from '#models/ApiToken'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string | null

  @column()
  public avatarUrl: string | null

  @column()
  public provider: string | null

  @column()
  public providerId: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ApiToken)
  public tokens: HasMany<typeof ApiToken>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password && user.password) {
      user.password = await hash.make(user.password)
    }
  }

  public async generateToken() {
    const token = await this.related('tokens').create({
      name: 'api_token',
      type: 'api',
    })
    return token
  }
}
