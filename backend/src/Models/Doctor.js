const mongoose = require('mongoose');
const schemaOptions = require('./SchemaOptions');

const DoctorSchema = new mongoose.Schema({
  doctorName: {
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
  degree: {
    type: mongoose.Schema.Types.String,
    require: false,
  },
  rating: {
    type: mongoose.Schema.Types.Number,
    require: false,
  },
  location: {
    type: {
      type: mongoose.Schema.Types.String,
    },
    coordinates: [mongoose.Schema.Types.Number]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  available: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
  },
}, schemaOptions);

DoctorSchema.index({ location: '2dsphere', doctorName: 1 }, { background: true });
module.exports = mongoose.model('Doctor', DoctorSchema);