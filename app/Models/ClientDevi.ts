import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ServiceProvider from './ServiceProvider'

export default class Devi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId?: number

  @column()
  public lastname?: string

  @column()
  public firstname?: string

  @column()
  public serviceProviderId: number

  @column()
  public message: string

  @column()
  public email?: string

  @column()
  public tel: string

  @column()
  public tel2?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ServiceProvider)
  public serviceProvider: BelongsTo<typeof ServiceProvider>
}
