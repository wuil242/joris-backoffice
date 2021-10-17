import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.get('/', 'LocationsController.getAllCities')

  Route.post('/', 'LocationsController.storeCity')

  
  Route.delete('/', 'LocationsController.destroyCity')

  Route.get('/:id/arrondissements', 'LocationsController.getArrondissements')
    .where('id', Route.matchers.number())

  Route.post('/:id/arrondissements', 'LocationsController.storeArrondissement')
    .where('id', Route.matchers.number())


  Route.delete('/:cityId/arrondissements', 'LocationsController.destroyArrondissement')
    .where('cityId', Route.matchers.number())

  Route.get('/:cityId/arrondissements/:arrondissementId/quaters', 'LocationsController.getQuaters')
    .where('cityId', Route.matchers.number())
    .where('arrondissementId', Route.matchers.number())

  Route.post('/:cityId/arrondissements/:arrondissementId/quaters', 'LocationsController.storeQuaters')
    .where('cityId', Route.matchers.number())
    .where('arrondissementId', Route.matchers.number())

  Route.delete('/:cityId/arrondissements/:arrondissementId/quaters', 'LocationsController.destroyQuaters')
    .where('cityId', Route.matchers.number())
    .where('arrondissementId', Route.matchers.number())

}).prefix('/api/cities')