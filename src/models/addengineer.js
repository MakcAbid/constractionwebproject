const async = require("hbs/lib/async");
const mongoose = require("mongoose");

const addengineerSchema = mongoose.Schema({
  engineername: {
    type: String,
    required: true,
  },
  engineernumber: {
    type: String,
    required: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  longdescription: {
    type: String,
    required: true,
  },
  engineerlocation: {
    type: String,
    required: true,
  },
  engineeremail: {
    type: String,
    required: true,
  },
});

const addengineer = new mongoose.model("addengineer", addengineerSchema);
module.exports = addengineer;
