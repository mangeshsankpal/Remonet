const express = require('express');
const router = express.Router();
var firebase = require('./Configuration');
var userData = require('./UserData')


router.get('/', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.redirect('../dashboard')
      console.log("User present");
    }
    else {
      console.log("User not present");
      res.render('./index')
    }
  });
});

router.get('/signup', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.redirect('../dashboard')
      console.log("User present");

    } else {
      console.log("User not present");
      res.render('./signup')
    }
  });
});

router.get('/passwordReset', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.redirect('../dashboard')
      console.log("User present");

    } else {
      console.log("User not present");
      res.render('./passwordReset')
    }
  });
});

router.get('/dashboard', (req, res)=> {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./dashboard', {
        user
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.get('/about', (req, res) => {res.render('./about')} );

router.get('/contact', (req, res) => {res.render('./contact')} );

router.get('/news', (req, res) => {res.render('./news')}  );

router.get('/underConst', (req, res) =>{
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./underConst', {
        user
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});



// router.get('/bms', (req, res) => {
//   firebase.auth().onAuthStateChanged(function (user) {
//
//     if (user) {
//
//       res.render('./bms', {
//         bmsData
//       });
//       console.log("User present");
//
//     } else {
//       console.log("User not present");
//       res.redirect('../')
//     }
//   });
// });
//
// router.get('/displaynode1', (req, res) =>{
//   firebase.auth().onAuthStateChanged(function (user) {
//
//     if (user) {
//
//       res.render('./displaynode1', {
//         assetData
//       });
//       console.log("User present");
//
//     } else {
//       console.log("User not present");
//       res.redirect('../')
//     }
//   });
// });
//
// router.get('/displaynode2', (req, res) =>{
//   firebase.auth().onAuthStateChanged(function (user) {
//
//     if (user) {
//
//       res.render('./displaynode2', {
//         assetData
//       });
//       console.log("User present");
//
//     } else {
//       console.log("User not present");
//       res.redirect('../')
//     }
//   });
// });
//
//

router.get('/userManagement', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./userManagement', {
        userData
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.get('/map', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./map');
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});
module.exports = router;
