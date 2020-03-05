const mongoose = require('mongoose');
const schemaOptions = require('./SchemaOptions');

const HospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: mongoose.Schema.Types.String,
    require: false,
  },
  address: {
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
    require: false
  },
  websiteUrl: {
    type: mongoose.Schema.Types.String,
    require: false,
  },
  location: {
    type: {
      type: mongoose.Schema.Types.String,
    },
    coordinates: [mongoose.Schema.Types.Number],
    required: false,
  },
  category: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
  },
  mobileNo: {
    type: [mongoose.Schema.Types.Number],
    required: false,
  },
  emailId:{
    type: mongoose.Schema.Types.String,
    require: false
  },
}, schemaOptions);

HospitalSchema.index({ location: '2dsphere', hospitalName: 1 }, { background: true });
module.exports = mongoose.model('Hospital', HospitalSchema);