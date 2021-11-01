import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'


export default class UsersController {
  private TOKEN_TABLE = 'api_tokens'

  //TODO: conexion sans regeneration de token
  async login({request, auth, response}:HttpContextContract) {
    try {
      const payload = await request.validate(UserValidator)
      
      const user = await auth.verifyCredentials(payload.email, payload.password)
      const {token} = await Database.query().from(this.TOKEN_TABLE).where('user_id', user.id).firstOrFail()
      
      return {
        type: 'success',
        typeCode: 1,
        message: 'Login Successfull',
        user: {...user?.serialize({fields: ['name', 'email']}), token}
      }
    }catch({messages}) {
      if(messages) {
        return response.status(404).json({errors: messages.errors, typeCode: 0})
      }
      return response.status(404).json({
        type: 'error',
        typeCode: 0,
        message: 'Identifiant Invalide',
      })
    }
  }

  async logout({auth, request}:HttpContextContract) {
    try {
      const validation = await schema.create({
        email: schema.string({trim: true}, [rules.email()]),
        token: schema.string()
      })
      
      const payload = await request.validate({schema: validation})
      const user = await User.findByOrFail('email', payload.email)
      const {token} = await Database.query().from(this.TOKEN_TABLE).where('user_id', user.id).firstOrFail()
      if(token !== payload.token) {
        throw 'invalid token'
      }
      return {
        type: 'success',
        typeCode: 1,
        message: 'Logout successfull'
      }
    } catch (error) {
      return {
        type: 'error',
        typeCode: 0,
        message: error
      }
    }
  }
}
