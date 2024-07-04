const mongoose = require('mongoose');

const Table = new mongoose.Schema({
  section: { type: String, required: true },
  shortName:{type:String , required:true},
  Table_no: [{ type: String }],
  Restorent:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
  
});

module.exports = mongoose.model('Table', Table);
