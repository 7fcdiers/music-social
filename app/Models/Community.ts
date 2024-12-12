import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import CommunityNews from '#models/CommunityNews'
import User from '#models/User'

export default class Community extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public imageUrl: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User)
  public members: ManyToMany<typeof User>

  @hasMany(() => CommunityNews)
  public news: HasMany<typeof CommunityNews>
}
