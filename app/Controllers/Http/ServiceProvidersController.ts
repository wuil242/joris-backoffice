import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'
import Job from 'App/Models/Job'
import AdressStoreValidator from 'App/Validators/AdressStoreValidator'
import ServiceProviderStoreValidator from 'App/Validators/ServiceProviderStoreValidator'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import Adress from 'App/Models/Adress'
import ServiceProvider from 'App/Models/ServiceProvider'

export default class ServiceProvidersController {
  private SERIALISE_FIELDS = [
    'firstname',
    'lastname',
    'email',
    'tel',
    'tel2',
    'birthday',
  ]

  async index({params, response}:HttpContextContract) {
    const page = params.page || 1

    const serviceProvidersData = await ServiceProvider.query().paginate(page, 10)

    if(serviceProvidersData.isEmpty) {
      return response.badRequest({
        type: 'infos',
        message: 'Aucun SP',
        serviceProvidersData
      })
    }

    return serviceProvidersData.serialize({fields: this.SERIALISE_FIELDS})
  }

  async store({request, response}:HttpContextContract) {
    //TODO: enrgeistrer les photo de profil correctement
    const transaction = await Database.transaction()

    try {
      const serviceProviderPayload = await request.validate(ServiceProviderStoreValidator)
      
      const age = Math.abs(serviceProviderPayload.birthday.year - DateTime.now().year)

      if(!(age >= 18 && age <= 65)) {
        await transaction.rollback()

        return response.badRequest({
          type: 'error',
          typeCode: 0,
          age,
          message: 'l\'age requis est de 18-65 ans',
        })

      }

      const jobId = +request.input('jobId')
      const job = await Job.findOrFail(jobId)
      const serviceProvider = await job.useTransaction(transaction).related('serviceProviders').create(serviceProviderPayload)
      
      const adressPayload = await request.validate(AdressStoreValidator)

      const city = await City.findOrFail(adressPayload.cityId)
      const arrondissement = await city.related('arrondissents').query().where('id', adressPayload.arrondissementId).firstOrFail()
      const quater = await arrondissement.related('quaters').query().where('id', adressPayload.quaterId).firstOrFail()

      const adressExist = await Adress.query().where('city_id', city.id)
                            .where('arrondissement_id', arrondissement.id)
                            .where('quater_id', quater.id)
                            .where('number_adress', adressPayload.number_adress)
                            .where('street', adressPayload.street)
                            .first()

      if(adressExist) {
        await transaction.rollback()

        return response.badRequest({
          type: 'error',
          typeCode: 0,
          adressExist,
          message: 'l\'adress appartient deja a un autre sp',
        })
      }

      const adress = await serviceProvider.useTransaction(transaction).related('adress').create(adressPayload)

      await transaction.commit()

      return response.ok({
        message: 'Sp has been created succeffuly',
        type: 'success',
        typeCode: 1,
        data: {
          ...serviceProvider.toJSON(),
          ...adress.toJSON()
        }
      })
    } catch (error) {
      await transaction.rollback()

      console.log('ERROR', error)

      if(error.messages) {
        return response.badRequest({
          type: 'error',
          message: 'Field Error',
          messages: error.messages
        })
      }

      if(error.code) {
       if(error.code === '23505') {
          return response.badRequest({
            type: 'error',
            message: 'Le sp existe deja'
          })
       }
      }

      return response.badRequest({
        type: 'error',
        message: 'impossible de creer le sp',
        errors: error
      })
    }
  }
}
