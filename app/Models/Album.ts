import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Artist from '#models/Artist'
import Comment from '#models/Comment'
import Rating from '#models/Rating'
import Track from '#models/Track'

export default class Album extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public title: string

  @column()
  public releaseDate: DateTime

  @column()
  public coverUrl: string

  @column()
  public genre: string

  @column()
  public artistId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Artist)
  public artist: BelongsTo<typeof Artist>

  @hasMany(() => Track)
  public tracks: HasMany<typeof Track>

  @hasMany(() => Rating)
  public ratings: HasMany<typeof Rating>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}
