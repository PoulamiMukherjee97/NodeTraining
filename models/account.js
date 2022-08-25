
// Let's have the schema created
// importing connection stuff 
const mongoose = require('./mongo');
const crypto = require('crypto');

// Schema 
const Schema = mongoose.Schema;
// building a collection with field and datatype 
const Account = new Schema({
  username: String,
  email: {type:String, unique: true},
  password: String,
  createdBy: String,
  salt: String,
  hash: String,
  createdOn: { type: Date, default: Date.now },
  updatedBy: String,
  updatedOn: { type: Date, default: Date.now },
}, {
  strict: true
});

Account.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 9876, 512, 'sha512').toString('hex');
}
// validating the password to return true or false
Account.methods.validatePassword = function(password){
  // 
  console.log(password);
  console.log(this.salt);
  console.log(this.hash);
  const hash = crypto.pbkdf2Sync(password, this.salt, 9876, 512, 'sha512').toString('hex');
  return this.hash === hash;
}
module.exports = mongoose.model('Account', Account);
