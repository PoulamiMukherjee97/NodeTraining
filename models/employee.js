// Let's have the schema created
// importing connection stuff 
const mongoose = require('./mongo');
// Schema 
const Schema = mongoose.Schema;
// building a collection with field and datatype 
const Employee = new Schema({
//   empId: Number,
  name: String,
  phone: String,
  email: String,
  createdBy: String,
  createdOn: { type: Date, default: Date.now },
  updatedBy: String,
  updatedOn: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Employee', Employee);
 // router => controllers       models/employee  =>  models/mongo => mongoConfig 