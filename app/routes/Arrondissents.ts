import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Arrondissement from 'App/Models/Arrondissement'
import City from 'App/Models/City'

Route.group(() => {

  Route.get('/', async ({}) => {
    const arrs = await Arrondissement.query().preload('city').orderBy('name', 'asc')

    return arrs.length > 0 ? arrs : {type: 'infos', message: 'No Arrondissement'}
  })

  Route.post('/', async ({request}) => {
    const validation = schema.create({
      name: schema.string({ trim: true }),
      cityId: schema.number()
    })

    const payload = await request.validate({schema: validation})

    const city = await City.findOrFail(payload.cityId)

    return await city.related('arrondissents').create(payload)
  })

}).prefix('/api/arrondissements')