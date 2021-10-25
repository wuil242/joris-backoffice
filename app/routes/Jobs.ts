import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.get('/', 'JobsController.index')

  Route.post('/', 'JobsController.store')

  Route.delete('/:id', 'JobsController.destroy')
    .where('id', Route.matchers.number())

}).prefix('/api/jobs')