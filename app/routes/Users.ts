import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

Route.group(() => {
  Route.post('/login', 'UsersController.login')

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
  
  
    Route.post('/logout', 'UsersController.logout')
  
    Route.delete('/delete', async ({auth, request}) => {
     try {
      const validation = await schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({ trim: true })
      })
  
      const payload = await request.validate({schema: validation})
      await auth.attempt(payload.email, payload.password)
  
      const user = await User.findOrFail(request.input('id'))
      await user.delete()
      return {
        type: 'success',
        message: 'User Deleted Succeffull'
      }
     
     } catch (error) {
      return {
        type: 'error',
        message: error
      }
     }
    })
    
  })

}).prefix('/api/users')