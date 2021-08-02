const mongoose = require('mongoose');
const { Schema } = mongoose;

const Multiplex = new Schema({
    name: { type: String, required: true, index: true },
    screens: [
        {
            screennumber : {type:String, index:true},
            moviename: {type:String, index:true},
            language: {type:String, enum:["T", "E", "H"], index:true},
            showtiming: [{type:Date, index:true}],
            visualization: {type:String, enum:["2D", "3D"], index:true},
            ticketprice: {type:String, index:true}
        }
    ]
  });

  module.exports = mongoose.model('Multiplex', Multiplex);