import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import City from "App/Models/City";
import Arrondissement from 'App/Models/Arrondissement'
import Quater from 'App/Models/Quater'


export default class LocationsController {
  private LIMIT = 20
  private VALIDATION = {
    NAME: schema.create({
      name: schema.string({ trim: true}, 
      [rules.regex(/[a-zA-Z0-9\-]{3,20}/)])
    }),
    ID: schema.create({
      id: schema.number()
    })
  }

  async getAllCities({}) {
    return await City.query().orderBy('name', 'asc')
  }

  async storeCity({request, response}:HttpContextContract) {

    try {
      const payload = await request.validate({schema: this.VALIDATION.NAME})
      return await City.create(payload)
    } catch ({messages}) {
      if(messages) {
        return response.status(404).json({errors: messages.errors, typeCode: 0})
      }

      return response.status(404).json({
        type: 'error',
        typeCode: 0,
        message: 'la ville existe deja'
      })
    }
  }

  async destroyCity({request}) {
    const validation = schema.create({
      cityId: schema.number()
    })
    
    let name = ''
    try {
      const payload = await request.validate({schema: validation})
      const city = await City.findByOrFail('id', payload.cityId)
      let name = city.name
      await city.delete()
      return {
        type: 'success',
        message: `la vile "${name}" a bien bien été supprimé`
      }
    } catch (error) {
      return {
        type: 'error',
        message: `la ville ${name !== '' ? '"' + name +'"'  : '' } n'a pas pu être suprimé`
      }
    }
  }

  /* Traitement des arrondissement */
  async getArrondissements({params, request, response}:HttpContextContract) {
    try {
      const city = await City.findOrFail(params.id)
      const page = +request.qs().page || 1

      const arrs =  await city.related('arrondissents').query()
        .orderBy('name', 'asc').paginate(page, this.LIMIT)
      
      const arrondissements = arrs.all()

      if(arrondissements.length > 0) {
        return response.ok({
          arrondissements,
          pagination: arrs.getUrlsForRange(arrs.firstPage, arrs.lastPage)
        })
      }

      return response.badRequest({
        type: 'infos',
        typeCode: 2,
        message: 'Aucun arrondissemnet Trouver',
      })
      
    } catch (error) {
      return response.badRequest({
        type: 'error',
        typeCode: 0,
        message: 'Erreur lors de la recherche d\'arrondissements'
      })
    }
  }

  async storeArrondissement({params, request, response}:HttpContextContract) {
    try {
        
      const payload = await request.validate({schema: this.VALIDATION.NAME})
      const arrYet  = await Arrondissement.query().where('city_id', params.id).where('name', payload.name)

      if(arrYet.length > 0 && arrYet[0]?.name === payload.name) {
        return response.badRequest({
          type: 'error',
          typeCode: 1,
          message: `l'arrondissement "${payload.name}" existe deja`
        })
      } 
      
      const city = await City.findOrFail(params.id)
      const arr = await city.related('arrondissents').create(payload)

      return response.created({
        type: 'success',
        typeCode: 1,
        message: `l'arrondissent ${arr.name} a bien été crée`,
        arrondissement: arr
      })
    } catch ({messages}) {
      if(messages) {
        return response.status(404).json({errors: messages.errors, typeCode: 0})
      }

      return response.badRequest({
        type: 'success',
        typeCode: 1,
        message: `l'arrondissent n\'a pu être crée`,
      })
    }
  }

  async destroyArrondissement ({params, request, response}:HttpContextContract) {
    try {
      const payload = await request.validate({schema: this.VALIDATION.ID})
      
      const city = await City.query().where('id', params.cityId)
        .preload('arrondissents', q => q.where('id', payload.id))
  
        
        const arr = city[0]?.arrondissents[0]
        if(!arr) {
          return response.badRequest({
            type: 'error',
            typeCode: 0,
            message: `Aucun Arrondissement correspend a cet enregistrement`
          })
        }
        
      await arr?.delete()
  
      return response.ok({
        type: 'success',
        typeCode: 1,
        message: `l'arrodissement ${arr.name} a bien ete suprimer`
      })
      
    } catch ({messages}) {
      if(messages) {
        return response.badRequest({
          errors: messages.errors, 
          typeCode: 0,
          message: `Aucun Arrondissement correspend a cet enregistrement`
        })
      }

      return response.badRequest({
        type: 'success',
        typeCode: 1,
        message: `l'arrondissent n\'a pu être crée`,
      })
    }
  }

  /** Traitement des quartiers */
  async getQuaters({params, request, response}:HttpContextContract) {
    const page = +request.qs().page || 1

    try {
      const pagination = await Quater.query()
        .where('arrondissement_id', params.arrondissementId)
        .where('city_id', params.cityId)
        .orderBy('name', 'asc')
        .paginate(page, this.LIMIT)
        
      const quaters = pagination.all()
 
      if(quaters.length > 0) {
        return response.ok({
          quaters,
          pagination: pagination.getUrlsForRange(pagination.firstPage, pagination.lastPage)
        })
      }
 
      return response.badRequest({
        type: 'infos',
        typeCode: 2,
        message: 'Aucun Quartier Trouver',
      })
     
    } catch (error) {
      return response.badRequest({
        type: 'error',
        typeCode: 0,
        message: 'Erreur Pendant le chargement des Quartiers',
      })
    }
  }

  async storeQuaters({params, request, response}:HttpContextContract) {
    try {
      const payload = await request.validate({schema: this.VALIDATION.NAME})

      const city = await City.query().where('id', params.cityId)
        .preload('arrondissents', q => {
          q.where('id', params.arrondissementId)
        })

     if(city.length < 0 || !city[0]) {
       return response.badRequest({
         type: 'error',
         typeCode: 0,
         message: `$le quartier "${payload.name}" ne peut être crée
         Car la ville "${city[0].name}" selectionnée n'existe pas`
       })
     }

     const arrs = city[0]?.arrondissents

     if(arrs.length < 0 || !arrs[0]) {
       return response.badRequest({
         type: 'error',
         typeCode: 0,
         message: `le quartier "${payload.name}" ne peut être crée
         Car l'arrondissement "${arrs[0].name}" selectionné n'existe pas`
       })
     }

     const quaterYet = await Quater.query().where('name', payload.name)
        .where('city_id', params.cityId)
        .where('arrondissement_id', params.arrondissementId)

     if(quaterYet.length > 0 || quaterYet[0]) {
       return response.badRequest({
         type: 'error',
         typeCode: 0,
         message: `le quatier "${payload.name}" 
         existe dejà dans la l'arrondissement "${arrs[0].name}" et la ville "${city[0].name}"`
       })
     }
  
      const quater = await arrs[0].related('quaters').create({
        cityId: params.cityId,
        ...payload
      })
  
      return {
        type: 'success',
        typeCode: 1,
        message: `le quartier "${quater.name}" a bien ete creer`,
        quater,
        limit: this.LIMIT
      }
      
    } catch ({messages}) {
      if(messages) {
        return response.badRequest({errors: messages.errors, typeCode: 0})
      }

      return {
        type: 'error',
        message: 'le quartier n\'a pu être crée'
      }
    }
  }

  async destroyQuaters({params, request, response}:HttpContextContract) {

    try {
      const payload = await request.validate({schema: this.VALIDATION.ID})
      
      const city = await City.query().where('id', params.cityId)
        .preload('arrondissents', (query) => {
          query.where('id', params.arrondissementId)
            .preload('quaters', q => q.where('id', payload.id))
        })
  
        
        const quater = city[0]?.arrondissents[0]?.quaters[0]
        if(!quater) {
          return response.badRequest({
            type: 'error',
            typeCode: 0,
            message: `Aucun Quartier ne correspend a cet enregistrement`
          })
        }
        
      await quater?.delete()
  
      return response.ok({
        type: 'success',
        typeCode: 1,
        message: `le quartier "${quater.name}" a bien été suprimer`,
        limit: this.LIMIT
      })
      
    } catch ({messages}) {
      // if(messages) {
      //   return response.badRequest({
      //     errors: messages.errors, 
      //     typeCode: 0,
      //     message: `Aucun Arrondissement correspend a cet enregistrement`
      //   })
      // }

      return response.badRequest({
        type: 'success',
        typeCode: 1,
        message: `l'arrondissent n\'a pu être crée`,
      })
    }
  }

}
