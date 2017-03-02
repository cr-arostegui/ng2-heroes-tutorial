const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const heroeSchema = new Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model('Heroe', heroeSchema);