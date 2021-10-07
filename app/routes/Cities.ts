import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import City from 'App/Models/City'

Route.group(() => {

  Route.get('/', async ({}) => {
    return await City.query().orderBy('name', 'asc')
  })

  Route.post('/', async ({request}) => {
    const validation = schema.create({
      name: schema.string({ trim: true })
    })

    const payload = await request.validate({schema: validation})

    return await City.create(payload)
  })

  Route.get('/:id/arrondissements', async ({params}) => {
    const city = await City.findOrFail(params.id)
    return await city.related('arrondissents').query().orderBy('name', 'asc')
  }).where('id', Route.matchers.number())

}).prefix('/api/cities')