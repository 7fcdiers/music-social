import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Album from '#models/Album'
import Artist from '#models/Artist'
import Comment from '#models/Comment'
import Community from '#models/Community'
import Rating from '#models/Rating'

export default class Concert extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime()
  public date: DateTime

  @column()
  public venue: string

  @column()
  public address: string

  @column()
  public latitude: number

  @column()
  public longitude: number

  @column()
  public ticketUrl: string | null

  @column()
  public albumId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Album)
  public album: BelongsTo<typeof Album>

  @manyToMany(() => Artist)
  public artists: ManyToMany<typeof Artist>

  @hasMany(() => Rating)
  public ratings: HasMany<typeof Rating>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @manyToMany(() => Community)
  public communities: ManyToMany<typeof Community>
}
