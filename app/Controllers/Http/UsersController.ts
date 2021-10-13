import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'

export default class UsersController {

  async login({request, auth, response}:HttpContextContract) {
    try {
      const validation = await schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({ trim: true })
      })
  
      const payload = await request.validate({schema: validation})
      const {token} = await auth.attempt(payload.email, payload.password)
      
      return {
        type: 'success',
        typeCode: 1,
        message: 'Login Successfull',
        user: {...auth.user?.serialize({fields: ['name', 'email']}), token}
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

  async logout({auth}:HttpContextContract) {
    try {
      await auth.use('api').revoke()
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
