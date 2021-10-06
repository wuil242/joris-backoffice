import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'API' }
  })

  Route.post('/login', async ({auth, request}) => {
    const validation = await schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true })
    })

    const payload = await request.validate({schema: validation})
    await auth.attempt(payload.email, payload.password)
    
    return {user: auth.user}
      
  })

  Route.post('/logout', async ({auth}) => {
    try {
      await auth.logout()
      return {success: 'Logout successfull'}
    } catch (error) {
      return {error}
    }
  })

}).prefix('/api/user')