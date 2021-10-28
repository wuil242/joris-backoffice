import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.get('/', 'DevisController.index')

}).prefix('/api/devis')