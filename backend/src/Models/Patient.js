const mongoose = require("mongoose");
const schemaOptions = require("./SchemaOptions");

const PatientSchema = new mongoose.Schema(
  {
    patientName: {
      type: mongoose.Schema.Types.String,
      require: false
    },
    age: {
      type: mongoose.Schema.Types.Number,
      require: false
    },
    contactNumber: {
      type: mongoose.Schema.Types.Number,
      require: false
    },

    diseaseDescription: {
      type: mongoose.Schema.Types.String,
      require: false
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    cabId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cab"
    },
    verificaionCode: {
      type: mongoose.Schema.Types.Number,
      required: false
    }
  },
  schemaOptions
);

module.exports = mongoose.model("Patient", PatientSchema);
