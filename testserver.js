var https = require('https');
var express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const jwt = require('jsonwebtoken');
var app = express();

 //const PUBLIC_KEY = fs.readFileSync(__dirname + '/public.key');
 const PRIVATE_KEY = fs.readFileSync(__dirname + '/private.key');

// config files
const db = require('./config/db');
var port = process.env.PORT || 4040; // set our port

const options = {
    user: db.user,
    pass: db.pass,
    useNewUrlParser: true,
    autoIndex: false
};
mongoose.connect(db.url, options, function (err) {
    if (err) {
        console.log(err);
    }
    else{
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        
        require('./app/routes')(app);
        exports = module.exports = app;

        app.listen(port);
        console.log('Server running on port ' + port);
    }
});

process.on('uncaughtException', function (err) {
    console.log('Threw Exception: ', err);
});

process.on('unhandledRejection', function (reason, p) {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
});

app.use(function (req, res, next) {
    // Put some preprocessing here.
    const urlCanBeAllowedWithoutToken = ['/app/authentication/signup'];
    if(urlCanBeAllowedWithoutToken.indexOf(req.url.toString()) > -1){
        next();
    }
    else{
        var token = req.headers['token'];
        if(!token){
            console.log("Invalid token");
            res.status(440).json({error:"Server Error"});
            return;
        }
        jwt.verify(token, PRIVATE_KEY, function (err, payload) {
            if (err) {
                console.log("Error: ", err);
                res.status(440).json({error:"Server Error"});
                return;
            }
            console.log("Valid User: ", payload);
            next();
        });
    } 
});

 //default error handler to ensure that the respose is sent to the client.
 app.use(function (err, req, res, next) {
    console.log("Error", err);
    if (res != null && !res.headersSent) {
        res.status(500).json({ error: 'Server Error' });
    }
});