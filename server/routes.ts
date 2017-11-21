import * as express from 'express';

import PokemonCtrl from './controllers/pokemon';
import UserCtrl from './controllers/user';
import Pokemon from './models/pokemon';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const pokemonCtrl = new PokemonCtrl();
  const userCtrl = new UserCtrl();

  //Allow client to fetch data
  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //Can change * to allow request from specific clients
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Pokemon
  router.route('/pokemon').get(pokemonCtrl.getAll);
  router.route('/pokemon/prr/:page').get(pokemonCtrl.getTen);
  router.route('/pokemon/search/:page').get(pokemonCtrl.search);
  router.route('/pokemon/type/:type').get(pokemonCtrl.getType);
  router.route('/pokemon/count').get(pokemonCtrl.count);
  router.route('/pokemon/:id').get(pokemonCtrl.get);


  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
