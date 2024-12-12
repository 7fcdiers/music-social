import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Album from '#models/Album'
import Artist from '#models/Artist'
import Comment from '#models/Comment'
import Rating from '#models/Rating'
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import type { HasMany } from "@adonisjs/lucid/types/relations";

export default class Track extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public title: string

  @column()
  public duration: number

  @column()
  public artistId: number

  @column()
  public albumId: number | null

  @column()
  public spotifyId: string | null

  @column()
  public deezerId: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Artist)
  public artist: BelongsTo<typeof Artist>

  @belongsTo(() => Album)
  public album: BelongsTo<typeof Album>

  @hasMany(() => Rating)
  public ratings: HasMany<typeof Rating>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}
