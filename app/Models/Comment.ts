import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Album from '#models/Album'
import Concert from '#models/Concert'
import Track from '#models/Track'
import User from '#models/User'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public albumId: number | null

  @column()
  public trackId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Album)
  public album: BelongsTo<typeof Album>

  @belongsTo(() => Track)
  public track: BelongsTo<typeof Track>

  @belongsTo(() => Concert)
  public concert: BelongsTo<typeof Concert>
}
