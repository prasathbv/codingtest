const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  employeeid : {type:String, required: true },
  username : { type: String, required: true, index: true },
  password : { type: String, required: true, index: true },
  dateofbirth : Date,
  experience : String,
  role : String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);