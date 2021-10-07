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

    try {
      const payload = await request.validate({schema: validation})
      return await City.create(payload)
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  })

  
  Route.delete('/', async ({request}) => {
    const validation = schema.create({
      cityId: schema.number()
    })
    
    try {
      const payload = await request.validate({schema: validation})
      const city = await City.findByOrFail('id', payload.cityId)
      await city.delete()
      return {
        type: 'success',
        message: `${city.name} has been deleted`
      }
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  })

  Route.get('/:id/arrondissements', async ({params}) => {
    const city = await City.findOrFail(params.id)
    return await city.related('arrondissents').query().orderBy('name', 'asc')
  }).where('id', Route.matchers.number())

}).prefix('/api/cities')