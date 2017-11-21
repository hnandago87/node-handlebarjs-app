const {User} = require('../../Models/UserModel');

var addUser = (body, success, err)=>{
    console.log("begin adding")
    var user = new User(body);
    user.generateAuthToken().then((token)=>{success(token,user)},(e)=>{err(e)})
}

module.exports = {addUser}