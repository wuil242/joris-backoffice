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

}).prefix('/api/cities')