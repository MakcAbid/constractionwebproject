const async = require("hbs/lib/async");
const mongoose = require("mongoose");

const addserviceSchema = mongoose.Schema({
  servicename: {
    type: String,
    required: true,
  },
  servicetype: {
    type: String,
    required: true,
  },
  serviceprice: {
    type: String,
    required: true,
  },
  servicerating: {
    type: String,
    required: true,
  },
});

const addservice = new mongoose.model("addservice", addserviceSchema);
module.exports = addservice;
