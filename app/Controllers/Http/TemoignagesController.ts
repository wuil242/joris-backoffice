import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Temoignage from 'App/Models/Temoignage'

export default class TemoignagesController {
  private LIMIT = 10
  public async index ({request}: HttpContextContract) {
    const page = +request.qs().page || 1
    return await Temoignage.query().paginate(page, this.LIMIT)
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({request}: HttpContextContract) {
    const validation = schema.create({
      name: schema.string(),
      message: schema.string(),
      photo: schema.string.optional()
    })

    const payoad = await request.validate({schema: validation})

    return await Temoignage.create(payoad)
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
