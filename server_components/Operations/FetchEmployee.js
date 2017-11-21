const {Employee} = require('../Models/EmployeeModel');

var FetchEmployee = (name, success, err)=>{
    console.log("begin fetch")
    var objectToQuery = {"name":name};
    return Employee.findOne(objectToQuery).then((data)=>{success(data)},(error)=>{err(error)});
}
var FetchEmployeesByDept = (dept, success, err)=>{
    console.log("begin fetch")
    var objectToQuery = {"dept":{"$in" :dept}};
    return Employee.find(objectToQuery).then((data)=>{success(data)},(error)=>{err(error)});
}

module.exports = {FetchEmployee,FetchEmployeesByDept};
