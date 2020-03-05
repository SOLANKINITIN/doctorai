const mongoose = require('mongoose');
const SchemaOptions = require('./SchemaOptions');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      require: false,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      require: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    cabId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cab'
    },
    orderStatus: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    pickupLocation:{
      type: {
        type: mongoose.Schema.Types.String,
      },
      coordinates: [mongoose.Schema.Types.Number]
    },
    destinationLocation:{
      type: {
        type: mongoose.Schema.Types.String,
      },
      coordinates: [mongoose.Schema.Types.Number]
    },
  },
  SchemaOptions
);

orderSchema.index({  pickupLocation: '2dsphere', destinationLocation:'2dsphere', sparse: true }, { background: true });

module.exports = mongoose.model('Orders', orderSchema);