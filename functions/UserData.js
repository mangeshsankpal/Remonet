var reference = require('./reference');
var ref = reference.usersRef;
ref.on('value', gotData, errData);


var fname1 = [];
var lname1 = [];
var email1 = [];
var password1 = [];
var designation1 = [];
var contact1 = [];
var role1 = [];
var approve1 = [];
var reject1 = [];


function gotData(data) {
    var userData = data.val();
    if(userData)
    {
        var keys = Object.keys(userData);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        fname1[i] = userData[k].fname;
        lname1[i] = userData[k].lname;
        email1[i] = userData[k].email;
        password1[i] = userData[k].password;
        designation1[i] = userData[k].designation;
        contact1[i] = userData[k].contact;
        role1[i] = userData[k].role;
        approve1[i] = userData[k].approve;
        reject1[i] = userData[k].reject;
     }

}

}
function errData(err) {
    console.log(err);
}

var usersData = {
    fname : fname1,
    lname : lname1 ,
    contact : contact1,
    designation : designation1,
    email : email1,
    password : password1,
    role : role1,
    approve : approve1,
    reject : reject1
}

if(usersData)
{
    module.exports = usersData;
}
