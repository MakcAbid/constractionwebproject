const async = require("hbs/lib/async");
const mongoose = require("mongoose");

const publishblogSchema = mongoose.Schema({
  blogtitle: {
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
  Service: {
    type: String,
    required: true,
  },
});

const publishblog = new mongoose.model("publishblog", publishblogSchema);
module.exports = publishblog;
