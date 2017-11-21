const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('../database/connection')
const {Employee} = require('../Models/EmployeeModel');
const {AddEmployee} = require('../Operations/insertEmployee');
const {FetchEmployee,FetchEmployeesByDept} = require('../Operations/FetchEmployee');
const {DeleteEmployee} = require('../Operations/DeleteEmployee');


module.exports = function(app){
    app.use(bodyParser.json());
    app.post('/employee/new', (req,res)=>{
        AddEmployee(req.body.name,req.body.access,req.body.dept,(data)=>{
            res.send(data)
        },(err)=>{
            res.status(400).send(err)
        });
    });
    app.get('/employees', (req, res)=>{
        Employee.find().then((data)=>{
            res.send(data);
        },(e)=>{
            res.status(400).send(err)
        })
    });
    app.get('/employees/:dept', (req, res)=>{
        const dept = req.params.dept;
        FetchEmployeesByDept(dept,(data)=>{
            res.send(data);
        },(e)=>{
            res.status(400).send(err)
        })
    });
    app.get('/employee/:name', (req, res)=>{
        const name = req.params.name;
        FetchEmployee(name,(data)=>{
            res.send(data);
        },(e)=>{
            res.status(400).send(err)
        })
    });
    app.delete('/employee/:name', (req, res)=>{
        const name = req.params.name;
        DeleteEmployee(name,(data)=>{
            res.send(data);
        },(e)=>{
            res.status(400).send(err)
        })
    });
    app.patch('/employee/:name',(req, res)=>{
        var name = req.params.name;
        Employee.findOneAndUpdate({"name":name},{$set:{dept:req.body.dept},$push:{access:req.body.access}},{new:true})
        .then((data)=>{
            res.send(data);
        },(e)=>{
            res.status(400).send();
        })
    })
}
