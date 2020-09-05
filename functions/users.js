const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');
var firebase = require('./Configuration');
var mailer = require('./Mailing')
var userData = require('./UserData')
const nodemailer = require("nodemailer");
var uref = require('./reference')
var ref = uref.usersRef;
var ref_user = uref.usersRef;
//ref_user.on('value', gotData1, errData1);
var Username = [];
var Emailid = [];
var keys_length;
function gotData1(data)
 {
  var userInfo = data.val();
  var keys = Object.keys(userInfo);
  keys_length = keys.length;
  for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      Username[i] = (userInfo[k].fname + userInfo[k].lname);
      Emailid[i] = userInfo[k].email;
  }
}
var User_login = [];
var Email_login = []
var UserData = {
  username : User_login,
}
function errData1(err) {
    console.log(err);
}

//Login Page
router.get('/login', (req, res) => {
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            res.redirect('../dashboard')
            console.log("User present");

        } else {
            console.log("User not present");
            res.redirect('../')
        }
    });
});

//Register Page
router.get('/register', (req, res) => {
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            res.redirect('../dashboard')
            console.log("User present");

        } else {
            console.log("User not present");
            res.redirect('../signup')
        }
    });
});

//Register Handle
router.post('/register', (req, res) => {
    const { fname, lname, designation, contact, email, password, password2 } = req.body;
    let errors = [];

    //Check required feilds
    if (!fname || !lname || !designation || !contact || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all the fields' });
    }

    //Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Check passwords length
    if (password.length < 6) {
        errors.push({ msg: "Password should contain atleast six characters" })
    }

    if (errors.length > 0) {
        res.render('./signup', {
            errors,
            fname,
            lname,
            contact,
            designation,
            email,
            password,
            password2
        });
    }
    else {
        //validation passed
        var approve = false;
        var reject = false;

        var uref = require('./reference');
        var ref = uref.usersRef;

        var k = 0;
        var flag = 0;
        var keys = Object.keys(userData);

        for (k = 0; k < keys.length; k++) {

            if (!(email.localeCompare(userData.email[k]))) {
                flag = 1;
                errors.push({ msg: "Email id already exists" });
                res.render("./signup", {
                    errors
                });
            }
        }

        if (!flag) {
            var userInfo = {
                fname,
                lname,
                contact,
                designation,
                email,
                password,
                approve,
                reject

            };
            ref.push(userInfo);

            mailer.mailing(email);
            res.redirect('../');
        }


    }

});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    let errors = [];

    //Check required feilds
    if (!email || !password) {
        errors.push({ msg: 'Please fill all the fields' });
    }


    //Check passwords length
    if (password.length < 6) {
        errors.push({ msg: "Password should contain atleast six characters" })
    }

    if (errors.length > 0) {
        res.render('./index', {
            errors
        });
    }
    else {
        //validation passed

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
                console.log('uid : ' + user.uid);

                if (!(email.localeCompare('dummy@gmail.com'))) {
                  res.redirect('../userManagement')
                }
                else {
                  // for(var j = 0; j < keys_length;j++){
                  //   if(email === Emailid[j])
                  //   {
                  //     UserData.username[0] = Username[j];
                  //     break;
                  //   }
                  // }
                  // res.render('./dashboard', {
                  //   UserData
                  // });
                  res.redirect('../dashboard');
                }
                return null;
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                errors.push({ msg: errorMessage });
                res.render('./', {
                    errors
                });

            });


    }
});



router.get('/logout', (req, res) => {
    firebase.auth().signOut();
    res.redirect('../');

})

//Password Reset Page
router.get('/passReset', (req, res) => {
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            res.redirect('../dashboard')
            console.log("User present");

        } else {
            console.log("User not present");
            res.redirect('../passwordReset')
        }
    });
});

router.post('/passReset', (req, res) => {
    const { email } = req.body;
    let errors = [];

    //Check required feilds
    if (!email) {
        errors.push({ msg: 'Please fill the email field' });
    }


    if (errors.length > 0) {
        res.render('./passwordReset', {
            errors
        });
    }
    else {
        //validation passed

        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                console.log('password reset mail send !!')
                res.redirect('../');
                return null;
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                errors.push({ msg: errorMessage });
                res.render('./passwordReset', {
                    errors
                });

            });


    }
});

router.get('/approval', (req, res) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let errors = [];
            var k = 0;
            var email = req.query.email;
            var roles = req.query.role;
            var password, flag = 0,eflag=0;
            var keys = Object.keys(userData);
            console.log("email : " + email);
            for (k = 0; k < keys.length; k++) {

                if ((!(email.localeCompare(userData.email[k]))) && userData.approve[k]===false) {

                    password = userData.password[k];
                    flag = 1;
                    break;
                }

            }
            if (flag) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function(user){
                     //Code to change user's approval status to true


                     var reference = require('./reference');
                     var db = admin.database();
                     var refer = reference.usersRef;
                     refer.on('value', gotData, errData);
                     function gotData(data) {
                         var userData = data.val();
                         if (userData) {
                             var keys = Object.keys(userData);
                             var newPostKey = keys[k]; //particular key for user detail.
                             console.log("The key is : " + newPostKey);
                             db.ref("UserDetails/"+newPostKey).update({approve : true,role : roles});

                             // Write the new post's data simultaneously in the posts list and the user's post list.
                             //  firebase.database().ref().child('/BMS/UserDetails/' + newPostKey)
                             //.update({ approve: true });

                         }
                     }

                     function errData(err) {
                         console.log(err);
                     }



                     //Code to  send the mail.
                         let transporter = nodemailer.createTransport({
                             service: 'gmail', // true for 465, false for other ports
                             auth: {
                                 user: 'dummy@gmail.com', // generated ethereal user
                                 pass: 'dummy$' // generated ethereal password
                             }
                         });

                         let mailOptions = {
                             from: 'dummy@gmail.com', // sender address
                             to: email, // list of receivers
                             subject: "Registration Successful", // Subject line
                             text: "Registration is complete ,now you can try logging in through link given below :.", // plain text body
                             html: "<a href='https://dummy.firebaseapp.com/'>Login</a> " // html body
                         };

                         transporter.sendMail(mailOptions, function (err, info) {
                             if (err)
                                 console.log(err)
                             else
                                 console.log(info);
                         });

                     console.log("sucessful");
                     errors.push({ msg: "Registered Successfully" });
                     res.render('./userManagement', { userData, errors });
                     return null;
                })

                .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...

                        console.log("inside catch");

                            let transporter = nodemailer.createTransport({
                                service: 'gmail', // true for 465, false for other ports
                                auth: {
                                    user: 'dummy@gmail.com', // generated ethereal user
                                    pass: 'dummy$' // generated ethereal password
                                }
                            });

                            // setup email data with unicode symbols
                            let mailOptions = {
                                from: 'dummy@gmail.com', // sender address
                                to: email, // list of receivers
                                subject: "Error during user registration", // Subject line
                                text: "Error Found : " + errorMessage, // plain text body
                                html: "<a href='https://dummy.firebaseapp.com/signup'>Register</a> " // html body
                            };

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err)
                                    console.log(err)
                                else
                                    console.log(info);
                            });

                        console.log(errorMessage);
                        errors.push({ msg: errorMessage });
                        res.render('./userManagement', { userData, errors });

                    })


            }


        }

        else {
            console.log("User not present");
            res.redirect('../')
        }


    });

});

router.get("/activation", (req, res) => {
    firebase.auth().onAuthStateChanged(function (user) {

        if (!user) {
            console.log("User not present");
            res.redirect('../')
            return null;
        }


        let errors = [];
        var k = 0;
        var email = req.query.email;
        var keys = Object.keys(userData);
        console.log("email : " + email);
        for (k = 0; k < keys.length; k++) {

            if (!(email.localeCompare(userData.email[k]))) {

                password = userData.password[k];
                break;
            }

        }
        var db = admin.database();
        var reference = require('./reference');

        var refer = reference.usersRef;
        refer.on('value', gotData, errData);
        function gotData(data) {
            var userData = data.val();
            if (userData) {
                var keys = Object.keys(userData);
                var newPostKey = keys[k]; //particular key for user detail.
                console.log("The key is : " + newPostKey);
                db.ref("UserDetails/" + newPostKey).update({ approve: true, reject: false });

                // Write the new post's data simultaneously in the posts list and the user's post list.
                //  firebase.database().ref().child('/BMS/UserDetails/' + newPostKey)
                //.update({ approve: true });

            }
        }

        function errData(err) {
            console.log(err);
            errors.push({ msg: err });
        }

        var userId = null;

        admin.auth().getUserByEmail(email)
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                userId = userRecord.uid;
                console.log('Successfully fetched user data:', userRecord.toJSON());

                admin.auth().updateUser(userId, {
                    disabled: false
                })
                    .then(function (userRecord) {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully updated user', userRecord.toJSON());


                        let transporter = nodemailer.createTransport({
                            service: 'gmail', // true for 465, false for other ports
                            auth: {
                                user: 'dummy@gmail.com', // generated ethereal user
                                pass: 'dummy$' // generated ethereal password
                            }
                        });

                        let mailOptions = {
                            from: 'dummy@gmail.com', // sender address
                            to: email, // list of receivers
                            subject: "Account Activated", // Subject line
                            text: "Your account has been activated by admin. ", // plain text body
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err)
                                console.log(err)
                            else
                                console.log(info);
                        });

                        console.log("activated");
                        errors.push({ msg: "Activated Successfully" });
                        return null;
                    })
                    .catch(function (error) {
                        errors.push(error);
                        console.log('Error updating user:', error);
                    });


                return null;
            })
            .catch(function (error) {
                console.log('Error fetching user data:', error);
            });


        res.render('./userManagement', { userData, errors });



    })
})







router.get("/deactivation", (req, res) => {

    firebase.auth().onAuthStateChanged(function (user) {


        if (!user) {
            console.log("User not present");
            res.redirect('../')
            return null;
        }
        let errors = [];
        var k = 0;
        var email = req.query.email;
        var keys = Object.keys(userData);
        console.log("email : " + email);
        for (k = 0; k < keys.length; k++) {

            if (!(email.localeCompare(userData.email[k]))) {

                password = userData.password[k];
                break;
            }

        }
        var db = admin.database();
        var reference = require('./reference');
        var refer = reference.usersRef;
        refer.on('value', gotData, errData);

        function gotData(data) {
            var userData = data.val();
            if (userData) {
                var keys = Object.keys(userData);
                var newPostKey = keys[k]; //particular key for user detail.
                console.log("The key is : " + newPostKey);
                db.ref("UserDetails/" + newPostKey).update({ approve: false, reject: true });

                // Write the new post's data simultaneously in the posts list and the user's post list.
                //  firebase.database().ref().child('/BMS/UserDetails/' + newPostKey)
                //.update({ approve: true });

            }
        }

        function errData(err) {
            console.log(err);
            errors.push({ msg: err });
        }

        var userId = null;

        admin.auth().getUserByEmail(email)
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                userId = userRecord.uid;
                console.log('Successfully updated user', userRecord.toJSON());



                admin.auth().updateUser(userId, {
                    disabled: true
                })
                    .then(function (userRecord) {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully updated user', userRecord.toJSON());


                        let transporter = nodemailer.createTransport({
                            service: 'gmail', // true for 465, false for other ports
                            auth: {
                                user: 'dummy@gmail.com', // generated ethereal user
                                pass: 'dummy$' // generated ethereal password
                            }
                        });

                        let mailOptions = {
                            from: 'dummy@gmail.com', // sender address
                            to: email, // list of receivers
                            subject: "Account deactivated", // Subject line
                            text: "Your account has been deactivated by admin. ", // plain text body
                        };

                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err)
                                console.log(err)
                            else
                                console.log(info);
                        });

                        console.log("deactivated");
                        errors.push({ msg: "Deactivated Successfully" });
                        return null;
                    })
                    .catch(function (error) {
                        errors.push(error);
                        console.log('Error updating user:', error);
                    });


                return null;
            })
            .catch(function (error) {
                console.log('Error fetching user data:', error);
            });





        res.render('./userManagement', { userData, errors });



    })
})


module.exports = router;
