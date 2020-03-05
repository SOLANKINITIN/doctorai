const mongoose = require('mongoose');
const SchemaOptions = require('./SchemaOptions');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title:{type:mongoose.Schema.Types.String,required:false},
    description:{type:mongoose.Schema.Types.String,required:false},
  },
  SchemaOptions
);

module.exports = mongoose.model('Category', categorySchema);