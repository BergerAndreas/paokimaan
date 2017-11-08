import * as mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  name: String,
  id: Number,
  weight: Number,
  height: Number,
  stats: [String],
  order: Number,
  is_default: Boolean,
  in_games: [String],
  moves: [String],
  type: [String],
  sprites: [String]
},{collection:'pokemon'});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
