import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

Route.group(() => {
  Route.get('/', async ({}) => {
    const users =  await User.query().limit(20).orderBy('name', 'asc')
    return users.map(user => user.serialize({fields: ['id', 'name', 'email']}))
  })
 
  Route.post('/sign-up', async ({request}) => {
    const validation = await schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }, [rules.confirmed('password_confirm')])
    })

    const payload = await request.validate({schema: validation})
    const user = await User.create(payload)
    
    return {
      type: 'success',
      message: 'User Created',
      user: user?.serialize({fields: ['name', 'email']})
    }
      
  })

  Route.post('/login', async ({auth, request}) => {
    const validation = await schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true })
    })

    const payload = await request.validate({schema: validation})
    await auth.attempt(payload.email, payload.password)
    
    return {
      type: 'success',
      message: 'Login Successfull',
      user: auth.user?.serialize({fields: ['name', 'email']})
    }
      
  })

  Route.post('/logout', async ({auth}) => {
    try {
      await auth.logout()
      return {
        type: 'success',
        message: 'Logout successfull'
      }
    } catch (error) {
      return {
        type: 'error',
        message: error
      }
    }
  })

}).prefix('/api/user')