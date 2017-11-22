import Pokemon from '../models/pokemon';
import BaseCtrl from './base';

export default class PokemonCtrl extends BaseCtrl {
  model = Pokemon;

  // Get all pokemen
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    }).sort({id: 1});
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
    // Setup for input variables
    const type = req.query.type ? req.query.type : null;
    const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
    const nameSearch = req.query.search ? req.query.search : null;
    const order = req.query.order === 'asc' ? 1 : -1;

    // convert weight from 0.1kg to kg
    const minWeight = req.query.minWeight ? req.query.minWeight * 10 : 0;
    const maxWeight = req.query.maxWeight ? req.query.maxWeight * 10 : 9999999999999;

    // Filters for search
    const nameFilter = nameSearch ? {name: { '$regex': nameSearch, '$options': 'i' }} : {};
    const typeFilter = type ? {type : type} : {};
    const weightFilter = {weight: { $gte: minWeight, $lte: maxWeight }};
    const filter = {
      $and: [
        nameFilter,
        typeFilter,
        weightFilter
      ]
    };

    this.model.paginate(filter , {page: req.params.page, limit: 10, sort: {[sortBy]: [order]}}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  // Get pokemon types by type
  getType = (req, res) => {
    this.model.find({ type: req.params.type }, {type: true}, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    }).sort({id: 1});
  }


}
