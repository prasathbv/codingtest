const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  username : { type: String, required: true, index: true },
  password : { type: String, required: true, index: true },
  dateofbirth : Date,
});

module.exports = mongoose.model('User', User);