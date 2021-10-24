import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.get('/', 'ServiceProvidersController.index')

  Route.post('/', 'ServiceProvidersController.store')

}).prefix('/api/service-provider')