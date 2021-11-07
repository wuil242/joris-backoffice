import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.get('/', 'TemoignagesController.index')

  Route.post('/', 'TemoignagesController.store')

}).prefix('/api/temoignages')