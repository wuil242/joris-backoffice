import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ClientDevi from 'App/Models/ClientDevi'

export default class ClientsController {
  private Client = Database.connection('pg_client', {mode: 'read'})
  private LIMIT = 10
  private TABLE = 'users'
  private FIELDS = ['id', 'firstname', 'lastname', 'email']
  private FIELDS_SERIALISE = ['id', 'firstname', 'lastname', 'email', 'client_id', 'tel', 'tel2']



  async index({request, params}:HttpContextContract) {
    const type = +params.type || 0
    const page = +request.qs().page || 1


    let clientsProfil = {}
    //just clients have profil
    if(type === 1 || type === 0) {
      clientsProfil = await this.query().select(this.FIELDS).paginate(page, this.LIMIT)

      if(type === 1) return clientsProfil
    }

    const clients = await ClientDevi.query().whereNull('client_id').paginate(page, this.LIMIT)
    const clientsWhithoutProfil = await clients.serialize({fields: this.FIELDS_SERIALISE})
   
    return type === 2 ?  clientsWhithoutProfil : {with: clientsProfil, whithout: clientsWhithoutProfil}
  }

  private query() {
    return this.Client.query().from(this.TABLE)
  }
}
