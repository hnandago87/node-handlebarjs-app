const {Employee} = require('../Models/EmployeeModel');

var AddEmployee = (name,access,dept, success, err)=>{
    var EmployeeToInsert = new Employee({
        name:name,
        access:access,
        dept:dept
    })
    console.log("begin save")
    return EmployeeToInsert.save().then((data)=>{success(data)},(error)=>{err(error)});
}

module.exports = {AddEmployee};
