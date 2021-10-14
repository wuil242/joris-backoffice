import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Arrondissement from 'App/Models/Arrondissement'
import City from 'App/Models/City'
import Quater from 'App/Models/Quater'

Route.group(() => {

  Route.get('/', 'LocationsController.getAllCities')

  Route.post('/', 'LocationsController.storeCity')

  
  Route.delete('/', 'LocationsController.destroyCity')

  Route.get('/:id/arrondissements', 'LocationsController.getArrondissements')
    .where('id', Route.matchers.number())

  Route.post('/:id/arrondissements', 'LocationsController.storeArrondissement')
    .where('id', Route.matchers.number())


  Route.delete('/:cityId/arrondissements', 'LocationsController.destroyArrondissement')
    .where('cityId', Route.matchers.number())

  Route.get('/:cityId/arrondissements/:arrondissementId/quaters', async ({params}) => {
   try {
    const city = await City.query().where('id', params.cityId).preload('arrondissents', q => {
      q.where('id', params.arrondissementId).preload('quaters', q => {
        q.orderBy('name', 'asc')
      })
    })

    const quaters = city[0]?.arrondissents[0]?.quaters

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