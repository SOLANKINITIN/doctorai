const mongoose = require('mongoose');
const schemaOptions = require('./SchemaOptions');

const CabSchema = new mongoose.Schema({
  driverName: {
    type: mongoose.Schema.Types.String,
    require: false,
  },
  thumbnailImage: {
    type: mongoose.Schema.Types.String,
    require: false,
  },
  description: {
    type: mongoose.Schema.Types.String,
    require: false,
  },
  rating: {
    type: mongoose.Schema.Types.Number,
    require: false,
  },
  cabsBooked: {
    type: mongoose.Schema.Types.Number,
    require: false,
    default: 0,
  },
  carName:{
    type: mongoose.Schema.Types.String,
    require: false,
  },
  cabNumber:{
    type: mongoose.Schema.Types.String,
    require: false,
  },
}, schemaOptions);

module.exports = mongoose.model('Cab', CabSchema);