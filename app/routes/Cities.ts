import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Arrondissement from 'App/Models/Arrondissement'
import City from 'App/Models/City'
import Quater from 'App/Models/Quater'

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

  Route.post('/:id/arrondissements', async ({params, request}) => {
    const validation = schema.create({
      name: schema.string({ trim: true })
    })

    
    const payload = await request.validate({schema: validation})
    const arrYet  = await Arrondissement.query().where('city_id', params.id).where('name', payload.name)

    if(arrYet.length > 0 && arrYet[0]?.name === payload.name) {
      return {
        type: 'error',
        message: 'Cet arrondissement existe deja'
      }
    } 
    
    const city = await City.findOrFail(params.id)
    return await city.related('arrondissents').create(payload)
  }).where('id', Route.matchers.number())


  Route.delete('/:cityId/arrondissements', async ({params, request}) => {
    const validation = schema.create({
      arrondissementId: schema.number()
    })
    
    const payload = await request.validate({schema: validation})
    
    const city = await City.query().where('id', params.cityId)
      .preload('arrondissents', q => q.where('id', payload.arrondissementId))

      
      const arr = city[0]?.arrondissents[0]
      if(!arr) {
        return {
          type: 'error',
          message: `Aucun Arrondissement correspend a cette enregistrement`
        }
      }
      
    await arr?.delete()

    return {
      type: 'success',
      message: `l'arrodissement ${arr.name} a bien ete suprimer`
    }
  }).where('cityId', Route.matchers.number())

  Route.get('/:cityId/arrondissements/:arrondissementId/quaters', async ({params}) => {
   try {
    const city = await City.query().where('id', params.cityId).preload('arrondissents', q => {
      q.where('id', params.arrondissementId)
    })

    const quaters = await city[0]?.arrondissents[0]?.related('quaters').query()
      .orderBy('name', 'asc')

    if(quaters.length > 0) {
      return quaters
    }

    return {
      type: 'infos',
      message: 'Aucun Quartier Trouver'
    }
    
   } catch (error) {
    return {
      type: 'error',
      message: error
    }
   }
  }).where('cityId', Route.matchers.number())
    .where('arrondissementId', Route.matchers.number())

  Route.post('/:cityId/arrondissements/:arrondissementId/quaters', async ({params, request}) => {
    try {
      const validation = schema.create({
        name: schema.string({ trim: true })
      })
      
      const payload = await request.validate({schema: validation})

     

      const city = await City.query().where('id', params.cityId).preload('arrondissents', q => {
        q.where('id', params.arrondissementId)
      })

     
  
      const quater = await city[0]?.arrondissents[0]?.related('quaters').create({
        cityId: params.cityId,
        ...payload
      })
      
  
      return {
        type: 'success',
        message: `le quartier ${quater.name} a bien ete creer`,
        quaters: [quater]
      }
      
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  }).where('cityId', Route.matchers.number())
    .where('arrondissementId', Route.matchers.number())

}).prefix('/api/cities')