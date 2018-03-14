const mongoose = require("mongoose");

const { Schema } = mongoose;

const BandSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  genre: {
    required: true,
    type: String
  }
});

//belong to every class instance
BandSchema.methods.getBandName = function() {
  return this.name;
};

//belong to schema
BandSchema.statics.getAllBands = cb => {
  Band.find({}, (err, bands) => {
    if (err) console.error(err);
    cb(bands);
  });
};

const Band = mongoose.model("Band", BandSchema);

module.exports = Band;
