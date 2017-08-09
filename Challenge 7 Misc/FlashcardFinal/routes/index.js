/*jshint esversion: 6 */

// Organising the code with separate files likes this is known as modularising, and is a best practice for organising code.
  // apps will often have more than one routes file.


const express = require('express');
const router = express.Router(); // router constructor to create a new router
  // a router is kind of like a mini app in Express. You can add middleware and routes to it.

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) { // check if name present or not and direct accordingly.
      res.render('index', { name }); // Could also use ES6 shorthand of {name} as the key and value are the same.
    // the render method bring in a template. In this case our pug index file.
    } else {
      res.redirect('/hello');
    }
});

// '/' is known as the location parameter. a.k.a 'root route'
// The Second parameter of the get method is an anonymous callback function
  // This callback function takes two parameters; a request object and a response object.
  // This callback will run when the client requests this route.

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) { // check if name present or not and direct accordingly.
    res.redirect('/'); // to index route
  } else {
    res.render('hello'); // to hello route
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username); // this stores a cookie in the user's browser when info is submitted.
  res.redirect('/'); // redirect to index
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username'); //clear the named cookie, in this case 'username'
  res.redirect('/hello'); // redirect to hello page after clearing cookie
});

module.exports = router; // export the router so it can be referenced in the app.js file
