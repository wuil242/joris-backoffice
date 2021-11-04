import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.group(() => {

  Route.get('/', 'ClientsController.index')

}).prefix('/api/clients')