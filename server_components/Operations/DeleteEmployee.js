const {Employee} = require('../Models/EmployeeModel');

var DeleteEmployee = (name, success, err)=>{
    console.log("begin fetch")
    var objectToQuery = {"name":name};
    Employee.findOneAndRemove(objectToQuery).then((data)=>{
            success(data);
        },(error)=>{
        err(error)
    });
}
module.exports = {DeleteEmployee}