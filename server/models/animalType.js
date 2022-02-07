const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalTypeSchema = new Schema({
  name: {type: String, required: true}
})

AnimalTypeSchema.virtual('url').get(function() {
  return '/catalog/animaltype/' + this._id
})

module.exports = mongoose.model('AnimalType', AnimalTypeSchema);
