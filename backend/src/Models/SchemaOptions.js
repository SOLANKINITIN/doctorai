const schemaOptions = {
  timestamps: true,
  writeConcern: {
    wtimeout: 10000,
    w: 1,
    j: undefined
  },
  strict: true,
  ordered: false
};

module.exports = schemaOptions;
