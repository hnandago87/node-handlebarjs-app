const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const exphbs = require('express-handlebars');
const {mongoose} = require('../database/connection');
global.appRoot = path.resolve(__dirname);
var blogging = express();

blogging.set('view engine','.hbs');
blogging.set('views', '../../views');
blogging.engine('.hbs', exphbs({
    defaultLayout: path.join(__dirname,'../..','/public/index'),
    extname: '.hbs',
    layoutsDir: path.join(__dirname,'../..','/views/Blog'),
    partialsDir  : [
        //  path to your partials
       path.join(__dirname,'../..','/views/Blog/BlogPartials'),
       path.join(__dirname,'../..','/views/partials')
    ]
}));

blogging.set('view engine','.hbs');
var data = [
            {
                Category: "General",
                DocumentList: [
                    {
                        DocumentName: "Document Name 1 - General",
                        DocumentLocation: "Document Location 1 - General"
                    },
                    {
                        DocumentName: "Document Name 2 - General",
                        DocumentLocation: "Document Location 2 - General"
                    }
                ]
            },
            {
                Category: "Unit Documents",
                DocumentList: [
                    {
                        DocumentName: "Document Name 1 - Unit Documents",
                        DocumentList: "Document Location 1 - Unit Documents"
                    }
                ]
            },
            {
                Category: "Minutes"
            }
        ];
 
    
    blogging.get('/',(req,res)=>{
        res.render(path.join(__dirname,'../..','/views/Blog/index.hbs'), data);
    });
    
module.exports = {blogging};
