var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var hbs = require('hbs');
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").strategy;
var multer = require("multer");
var flash = require("connect-flash");
var expressValidator = require("express-validator");
const exphbs = require('express-handlebars');
const fs = require('fs')
var app = express();
var {blogging} = require('./server_components/API/BlogAPI');
app.use(express.static(path.join(__dirname,'/public')));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
    errorFormatter:function(param, msg,value){
        var namespace = param.split('.')
        , root = namespace.shift()
        ,formParam = root;

        while(namespace.length){
            formParam += '['+namespace.shift()+']';
        }
        return{
            param:formParam,
            msg:msg,
            value:value
        }
    }
}));
app.use(require("connect-flash")());
app.use(function(req,res,next){
    res.locals.messages = require('express-messages')(req,res);
    next();
});
app.use(bodyParser.json());
//app.use(multer({dest:'./server_components/uploads'}));
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));





//Set the views to be used in the express end points
app.set('views', path.join(__dirname, '/views'));
app.engine('.hbs', exphbs({
    defaultLayout: path.join(__dirname,'public/index'),
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/'),
    partialsDir  : [
        //  path to your partials
        __dirname + '/views/partials',
        __dirname + '/views/Blog/BlogPartials'
    ]
}));
app.set('view engine','.hbs');




app.get('/', function(req, res){
    res.render('default');
});
app.get('/first', function(req, res){
    res.render('firstpage.hbs',{
        fullName:"HK",
        jobTitle:"SD"
    });
});

app.use('/blog', blogging);
require('./server_components/API/LoginAPI')(app);
require('./server_components/API/EmployeeAPI')(app);
//require('./server_components/API/BlogAPI')(app);
app.listen(3210, function(){
    console.log("server started");
});



//  hbs.registerPartials(__dirname + '/pages/partials');
//  hbs.registerPartials(__dirname + '/pages/Blog');
//  hbs.registerPartial('login', fs.readFileSync(__dirname + '/pages/partials/login.hbs', 'utf8'));
