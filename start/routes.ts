/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import {schema, rules} from '@ioc:Adonis/Core/Validator'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'API' }
  })

  Route.post('/api/login', async ({auth, request, response}) => {
    const validation = await schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true })
    })
  
    const payload = await request.validate({schema: validation})
    await auth.attempt(payload.email, payload.password)
  
    return await response.redirect('/')
  }).as('post_login')

}).prefix('/api')

//SPA render
Route.on('*').render('index')
