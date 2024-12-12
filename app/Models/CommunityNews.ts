import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Community from '#models/Community'
import User from '#models/User'

export default class CommunityNews extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public userUid: string

  @column()
  public communityUid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @belongsTo(() => Community)
  public community: BelongsTo<typeof Community>
}
