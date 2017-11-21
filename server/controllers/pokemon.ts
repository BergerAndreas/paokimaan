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
    const type = req.query.type ? req.query.type : null
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id'
    let typeFilter
    if (type){
      typeFilter = {type : type};
    } else {
      typeFilter = {};
    }
    this.model.paginate(typeFilter , {page: req.params.page,limit:10, sort:{[sortBy]:1}}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    })
  }

  // Search
  search = (req, res) => {
    const searchQuery = req.query.search ? req.query.search : "*"
    this.model.paginate({name:{ "$regex": searchQuery, "$options": "i" }}, {page: req.params.page, limit:10, sort:{name:1}}, (err, docs) => {
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
