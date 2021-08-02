const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../model/user');

exports.login = async function(req, res){
  try{
    if(!req || !req.body || !req.body.username || !req.body.password){
        throw "Invalid Request Object";
    }
    else{
    const userDetails = await User.findOne({username:req.body.username, password:req.body.password}).exec();
    res.status(200).json({user:userDetails});
    }
  }catch(ex){
    console.log("Login API Error", ex);
    res.status(500).json({error:"Error occurred while authentication"});
  }  
};

exports.signup = async function(req, res){
    try{
      if(!req || !req.body || !req.body.username || !req.body.password || !req.body.dob){
          throw "Invalid Request Object";
      }
      else{
      let newuser = {};
      newuser.username = req.body.username;
      newuser.password = req.body.password;
      newuser.dateofbirth = req.body.dob;
      
      //const PUBLIC_KEY = fs.readFileSync(__dirname + '/public.key');
      const PRIVATE_KEY = fs.readFileSync(path.resolve("./") + '/private.key');


      var jwt_token = jwt.sign(newuser,PRIVATE_KEY,{ expiresIn: "60d" });
      let user = new User(newuser);
      const saveduser = await user.save();
      res.status(200).json({user:saveduser, token: jwt_token});
      }
    }catch(ex){
      console.log("SignIn API Error", ex);
      res.status(500).json({error:"Error occurred while sign in."});
    }  
  };