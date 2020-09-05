// // var userInfo = {
// //     name: 'Ram',
// //     email: 'ram@gmail.com',
// //     password: 123456,
// //     confirm: 123456
// // }
// //
// // module.exports = userInfo;
//
// const express = require('express');
// const router = express.Router();
// var firebase = require('../Config/Configuration');
// var mailer = require('../models/Mailing')
// var userData = require('../models/UserData')
// const nodemailer = require("nodemailer");
// var uref = require('../DatabaseRef/reference')
// var ref = uref.usersRef;
//
// //Login Page
// router.get('/login', (req, res) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//
//         if (user) {
//
//             res.redirect('/dashboard')
//             console.log("User present");
//
//         } else {
//             console.log("User not present");
//             res.redirect('/')
//         }
//     });
// });
//
// //Register Page
// router.get('/register', (req, res) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//
//         if (user) {
//
//             res.redirect('/dashboard')
//             console.log("User present");
//
//         } else {
//             console.log("User not present");
//             res.redirect('/signup')
//         }
//     });
// });
//
// //Register Handle
// router.post('/register', (req, res) => {
//     const { fname, lname, designation, contact, email, password, password2 } = req.body;
//     let errors = [];
//
//     //Check required feilds
//     if (!fname || !lname || !designation || !contact || !email || !password || !password2) {
//         errors.push({ msg: 'Please fill all the fields' });
//     }
//
//     //Check passwords match
//     if (password != password2) {
//         errors.push({ msg: 'Passwords do not match' });
//     }
//
//     //Check passwords length
//     if (password.length < 6) {
//         errors.push({ msg: "Password should contain atleast six characters" })
//     }
//
//     if (errors.length > 0) {
//         res.render('./signup', {
//             errors,
//             fname,
//             lname,
//             contact,
//             designation,
//             email,
//             password,
//             password2
//         });
//     }
//     else {
//         //validation passed
//         var approve = false;
//         var reject = false;
//
//         var uref = require('../DatabaseRef/reference');
//         var ref = uref.usersRef;
//
//         var k = 0;
//         var flag=0;
//         var keys = Object.keys(userData);
//
//         for (k = 0; k < keys.length; k++) {
//
//             if (!(email.localeCompare(userData.email[k]))) {
//                 flag=1;
//                 errors.push({msg:"Email id already exists"});
//                 res.render("./signup",{
//                     errors
//                 });
//             }
//         }
//
//         if(!flag)
//         {
//             var userInfo = {
//                 fname,
//                 lname,
//                 contact,
//                 designation,
//                 email,
//                 password,
//                 approve,
//                 reject
//
//             };
//             ref.push(userInfo);
//
//             mailer.mailing(email);
//             res.redirect('/');
//         }
//
//
//
//     }
//
// });
//
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     let errors = [];
//
//     //Check required feilds
//     if (!email || !password) {
//         errors.push({ msg: 'Please fill all the fields' });
//     }
//
//
//     //Check passwords length
//     if (password.length < 6) {
//         errors.push({ msg: "Password should contain atleast six characters" })
//     }
//
//     if (errors.length > 0) {
//         res.render('./welcome', {
//             errors
//         });
//     }
//     else {
//         //validation passed
//
//         firebase.auth().signInWithEmailAndPassword(email, password)
//             .then(function (user) {
//                 console.log('uid : ' + user.uid)
//
//                 if (email == 'mangeshsankpal017@gmail.com') {
//                     res.redirect('/adminHome');
//                 }
//                 else {
//                     res.redirect('/dashboard');
//                 }
//
//
//             })
//             .catch(function (error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // ...
//                 errors.push({ msg: errorMessage });
//                 res.render('./welcome', {
//                     errors
//                 });
//
//             });
//
//
//     }
// });
//
//
//
// router.get('/logout', (req, res) => {
//     firebase.auth().signOut();
//     res.redirect('/');
//
// })
//
// //Password Reset Page
// router.get('/passReset', (req, res) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//
//         if (user) {
//
//             res.redirect('/dashboard')
//             console.log("User present");
//
//         } else {
//             console.log("User not present");
//             res.redirect('/passwordReset')
//         }
//     });
// });
//
// router.post('/passReset', (req, res) => {
//     const { email } = req.body;
//     let errors = [];
//
//     //Check required feilds
//     if (!email) {
//         errors.push({ msg: 'Please fill the email field' });
//     }
//
//
//     if (errors.length > 0) {
//         res.render('./passwordReset', {
//             errors
//         });
//     }
//     else {
//         //validation passed
//
//         firebase.auth().sendPasswordResetEmail(email)
//             .then(function () {
//                 console.log('password reset mail send !!')
//                 res.redirect('/');
//
//             })
//             .catch(function (error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // ...
//                 errors.push({ msg: errorMessage });
//                 res.render('./passwordReset', {
//                     errors
//                 });
//
//             });
//
//
//     }
// });
//
// router.get('/adminHome', (req, res) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//
//         if (user) {
//
//             res.redirect('/adminHome')
//             console.log("User present");
//
//         } else {
//             console.log("User not present");
//             res.redirect('/')
//         }
//     });
// });
//
//
// router.get('/approval', (req, res) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             let errors = [];
//             var k = 0;
//             var email = req.query.email;
//             var keys = Object.keys(userData);
//             console.log("email : " + email);
//             for (k = 0; k < keys.length; k++) {
//                 console.log("user email : " + userData.email[k]);
//                 if (!(email.localeCompare(userData.email[k]))) {
//
//                     console.log("user email : " + userData.email[k]);
//                     var password = userData.password[k];
//                     console.log("password taken ");
//                     firebase.auth().createUserWithEmailAndPassword(email, password)
//                         .then(function (user) {
//                             console.log("inside firebase");
//
//                              //Code to change approval to true of specific user
//                              //Error (while running) :@firebase/database: FIREBASE WARNING: Exception was thrown by user callback.
//                              //Error: FIREBASE FATAL ERROR: Database initialized multiple times.
//                              //Please make sure the format of the database URL matches with each database() call.
//
//
//
//                              /*              var reference = require('../DatabaseRef/reference');
//                                           var ref = reference.usersRef;
//                                           ref.on('value', gotData, errData);
//                                           function gotData(data) {
//                                               var userData = data.val();
//                                               if (userData != null) {
//                                                   var keys = Object.keys(userData);
//                                                   var newPostKey = keys[k]; //particular key for user detail.
//
//                                                   // Write the new post's data simultaneously in the posts list and the user's post list.
//                                                   firebase.database().ref().child('/UserDetails/' + newPostKey)
//                                                       .update({ approve: true });
//
//                                               }
//                                           }
//
//                                           function errData(err) {
//                                               console.log(err);
//                                           }
//
//                                              */
//
//
//                              //Code to  send the mail.
//                             let transporter = nodemailer.createTransport({
//                                 service: 'gmail', // true for 465, false for other ports
//                                 auth: {
//                                     user: 'kakarotsan017@gmail.com', // generated ethereal user
//                                     pass: '42jokerGame115$' // generated ethereal password
//                                 }
//                             });
//
//                             let mailOptions = {
//                                 from: 'kakarotsan017@gmail.com', // sender address
//                                 to: email, // list of receivers
//                                 subject: "Registration Successful", // Subject line
//                                 text: "Registration is complete ,now you can try logging in through link given below :.", // plain text body
//                                 html: "<a href='http://localhost:5005/'>Login</a> " // html body
//                             };
//
//                             transporter.sendMail(mailOptions, function (err, info) {
//                                 if (err)
//                                     console.log(err)
//                                 else
//                                     console.log(info);
//                             });
//
//                             errors.push({ msg: "Registered Successfully" });
//                             res.render('./addUser', { userData, errors });
//
//
//                         })
//                          //Code to be executed when an error occurs
//                         .catch(function (error) {
//                             var errorCode = error.code;
//                             var errorMessage = error.message;
//                             // ...
//
//                             console.log("inside catch");
//
//                             let transporter = nodemailer.createTransport({
//                                 service: 'gmail', // true for 465, false for other ports
//                                 auth: {
//                                     user: 'kakarotsan017@gmail.com', // generated ethereal user
//                                     pass: '42jokerGame115$' // generated ethereal password
//                                 }
//                             });
//
//                             // setup email data with unicode symbols
//                             let mailOptions = {
//                                 from: 'kakarotsan017@gmail.com', // sender address
//                                 to: email, // list of receivers
//                                 subject: "Error during user registration", // Subject line
//                                 text: "Error Found : " + errorMessage, // plain text body
//                                 html: "<a href='http://localhost:5005/signup'>Register</a> " // html body
//                             };
//
//                             // send mail with defined transport object
//                             transporter.sendMail(mailOptions, function (err, info) {
//                                 if (err)
//                                     console.log(err)
//                                 else
//                                     console.log(info);
//                             });
//
//                             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//                             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//
//
//
//                             errors.push({ msg: errorMessage });
//                             res.render('./addUser', { userData, errors });
//
//
//
//
//                         })
//
//                     break;
//                 }
//
//             }
//
//             console.log("out of for loop");
//
//
//         }
//
//         else {
//             console.log("User not present");
//             res.redirect('/')
//         }
//
//
//     })
//
// })
//
//
//
//
// module.exports = router;
