import Pokemon from '../models/pokemon';
import BaseCtrl from './base';

export default class PokemonCtrl extends BaseCtrl {
  model = Pokemon;

  // Get by id
  get = (req, res) => {
    this.model.findOne({ id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }
}
