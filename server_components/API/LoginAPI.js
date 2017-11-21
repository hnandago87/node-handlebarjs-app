const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('../database/connection')
const {User} = require('../Models/UserModel');
const {addUser} = require('../Operations/LoginOperations/Login');

module.exports = function(app){
    app.use(bodyParser.json());
    app.post('/user',function(req,res){
        var body = _.pick(req.body,['email', 'password']);
        console.log(body);
        addUser(body, (auth,data)=>{
            res.header('x-auth', auth).send(data);
        }, (err)=>{
            res.status(400).send(err);
        })
    });
    var authenticate = (req,res, next)=>{
        var token = req.header('x-auth');
        User.findByToken(token).then((user)=>{
            if(!user){
                return Promise.reject();
            }
            req.user = user;
            req.token = token;
            next();
        }).catch((e)=>{
            res.status(401).send();
        });
    }
    app.get('/user/me',authenticate, (req, res)=>{
        res.send(req.user);
    });
    app.post('/users/login',(req,res)=>{
         var body = _.pick(req.body,['email', 'password']);
         User.findByCredentials(body.email,body.password).then((user)=>{
            return user.generateAuthToken().then((token)=>{
                res.header('x-auth',token).send(user);
            })
         }).catch((err)=>{
            res.header(400).send();
         })
    })
    app.delete('/user/me/token',authenticate,(req,res)=>{
        req.user.removeToken(req.token).then(()=>{
            res.status(200).send();
        },(e)=>{
            res.status(400).send();
        })
    })
}