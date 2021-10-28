import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Devi from 'App/Models/Devi'

export default class DevisController {
  private LIMIT = 10
  private ORDER = 'created_at'
  private FILEDS = ['id', 'lastname', 'firstname', 'tel', 'tel2', 'email', 'created_at']
  async index({request}:HttpContextContract) {
    const page = +request.qs().page || 1
    const devis = await Devi.query().orderBy(this.ORDER, 'desc')
      .preload('serviceProvider').paginate(page, this.LIMIT)

    return devis.serialize({fields: this.FILEDS})
  }
}
