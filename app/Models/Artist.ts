import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Album from '#models/Album'
import Track from '#models/Track'

export default class Artist extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public name: string

  @column()
  public bio: string

  @column()
  public imageUrl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Album)
  public albums: HasMany<typeof Album>

  @hasMany(() => Track)
  public tracks: HasMany<typeof Track>
}
