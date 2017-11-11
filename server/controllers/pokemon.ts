import Pokemon from '../models/pokemon';
import BaseCtrl from './base';

export default class PokemonCtrl extends BaseCtrl {
  model = Pokemon;

  // Get all pokemen
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    }).sort({id:1});
  }

  // Get by id
  get = (req, res) => {
    this.model.findOne({ id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

  // Get ten pokemen
  getTen = (req, res) => {
    this.model.paginate({}, { page: req.params.page,limit:10, sort:{id:1}}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    })
  }

  // Get pokemon by type
  getType = (req, res) => {
    this.model.find({ type: req.params.type }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    }).sort({id:1});
  }
}
