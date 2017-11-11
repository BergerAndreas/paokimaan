import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate'

const pokemonSchema = new mongoose.Schema({
  name: String,
  id: Number,
  weight: Number,
  height: Number,
  stats: Object,
  order: Number,
  is_default: Boolean,
  in_games: [String],
  moves: [String],
  type: [String],
  sprites: Object
},{collection:'pokemon'});

pokemonSchema.plugin(mongoosePaginate)

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
