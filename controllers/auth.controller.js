const passport = require("passport");
const Account = require("../models/account");
exports.signup = (req, res) => {
  console.log(req);
  
  // generate salt and hash for the password 
  // remove the password 
  // then, create the account
  
  const accountDao = new Account(req.body);
  accountDao.setPassword(req.body.password);
  console.log(accountDao);
  // TODO: now delete the password from the dao - how to remove prop from obj
  accountDao.save( (err, data) => {
    if(!err){
      console.log(data);
      res.send({status: 'Account Created Successfully! '});
      // if you want to send email to verify email -- do it here
      // refer sendgrid package 
    }else{
      console.log(err);
      res.send(err);
    }
  })
}
  // login 
  exports.login = (req, res) => {
    console.log(req);
    passport.authenticate('local', function(err, account, info) {
      if(err){
        res.send(err)
      }
      if(account){
        res.send({status:'Will send token'})
      }else{
        res.send(info);
      }
    })(req,res);
  }
  