import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import City from "App/Models/City";
import Arrondissement from 'App/Models/Arrondissement'
import Quater from 'App/Models/Quater'


export default class LocationsController {
  async getAllCities({}) {
    return await City.query().orderBy('name', 'asc')
  }

  async storeCity({request, response}:HttpContextContract) {
    const validation = schema.create({
      name: schema.string({ trim: true }, [rules.regex(/[a-zA-Z\-]{3,20}/)])
    })

    try {
      const payload = await request.validate({schema: validation})
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
}
