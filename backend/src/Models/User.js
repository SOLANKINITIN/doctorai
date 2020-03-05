const mongoose = require("mongoose");
const SchemaOptions = require("./SchemaOptions");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      require: true,
      unique: true
    },
    password: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    isAdmin: {
      type: mongoose.Schema.Types.Boolean,
      default: false
    },
    resetPasswordToken: {
      type: mongoose.Schema.Types.String
    },
    resetPasswordExpires: {
      type: mongoose.Schema.Types.Date
    }
  },
  SchemaOptions
);

userSchema.index({ username: 1, sparse: true }, { background: true });

module.exports = mongoose.model("User", userSchema);
