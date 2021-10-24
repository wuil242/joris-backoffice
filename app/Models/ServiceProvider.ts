import { DateTime,  } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Adress from './Adress'
import Job from './Job'
import ServiceProviderRealisation from './ServiceProviderRealisation'
import { SEXE } from 'App/Types/enums'

export default class ServiceProvider extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public lastname: string

  @column()
  public firstname: string

  @column.date({serialize(value:DateTime) {
    return value.toFormat("dd LLLL yyyy", {locale: 'fr'})
  }})
  public birthday: DateTime

  @column()
  public tel: String

  @column()
  public tel2: string

  @column()
  public email: string

  @column()
  public photo?: string

  @column()
  public accrochSentence?: string

  @column()
  public introduce?: string

  @column()
  public sexe: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Adress)
  public adress: HasOne<typeof Adress>

  @manyToMany(() => Job, {
    pivotTable: 'service_provider_jobs',
  })
  public jobs: ManyToMany<typeof Job>

  @hasMany(() => ServiceProviderRealisation)
  public realisations: HasMany<typeof ServiceProviderRealisation>
}
