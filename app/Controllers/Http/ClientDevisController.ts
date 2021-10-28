import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientDevi from 'App/Models/ClientDevi'

export default class DevisController {
  private LIMIT = 10
  private ORDER = 'created_at'
  private FILEDS = ['id', 'lastname', 'firstname', 'tel', 'tel2', 'email', 'created_at']
  async index({request}:HttpContextContract) {
    const page = +request.qs().page || 1
    const devis = await ClientDevi.query().orderBy(this.ORDER, 'desc')
      .preload('serviceProvider').paginate(page, this.LIMIT)

    return devis.serialize({fields: this.FILEDS})
  }
}
