import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceProvider from './ServiceProvider'
import {string} from '@ioc:Adonis/Core/Helpers'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public color: string

  @column()
  public bgColor?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => ServiceProvider, {
    pivotTable: 'service_provider_jobs',
  })
  public serviceProviders: ManyToMany<typeof ServiceProvider>

 
  @beforeSave()
  public static async hashPassword (job: Job) {
    if (job.$dirty.name) {
      job.name = string.capitalCase(job.name)
    }
  }
}
