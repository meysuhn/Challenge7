/*jshint esversion: 6 */
/* jshint node: true */

/////////////////////////////////////
// Chris Mason
// TreeHouse TechDegree Challenge 7
/////////////////////////////////////

/////////////////////////////////////
// Require app's packages
const express = require('express');
const router = express.Router(); // router constructor to create a new router
const app = express(); // // the app variable is now the central part of our application. Here is it Express.
const moment = require('moment');
const Twit = require('twit');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const routes = require('./routes'); // Bring in the routes folder. Because it's named 'index' we don't need to refer to it.
const http = require('http').Server(app); // use server on http rather than app.listen for socket.io.

/////////////////////////////////////
// Set properties on the app object to persist through app's lifetime
// The app.locals object is a JavaScript object, and its properties are local variables within the application.
app.locals.moment = require('moment');
app.locals.socket = require('socket.io'); // This allows moment to be used within a jade template

/////////////////////////////////////
// Set up the middleware used in the app
app.use(bodyParser.urlencoded({ extended: false})); //NOTE not quite sure if this is necessary? It's for the tweet bit
app.use(router); // a router is kind of like a mini app in Express. You can add middleware and routes to it.
app.use(routes); // use the routes variable I declared to make middleware
app.use(express.static('public')); // include the static files (things that don't need to be processed on server)

/////////////////////////////////////
// The app.set method is used to set the app's parameters
app.set('view engine', 'pug'); // set view engine to parameter pug. As result we don't need to 'require' pug.



app.get('/', (req, res) => {
  timelineTweets = res.timeline;
  following = res.following;
  messages = res.messages;
  let screen_name = "@" + timelineTweets[0].user.screen_name; // this is for the header.
  let profileImageUrl1 = timelineTweets[0].user.profile_image_url;
  let followerCount = timelineTweets[0].user.friends_count;
  let banner = timelineTweets[0].user.profile_banner_url;
  res.render('index', {banner, followerCount, screen_name, timelineTweets, following, messages});
 //next(err); // Can't have next(err) here for this reason https://stackoverflow.com/questions/34983520/express-js-routing-error-cant-set-headers-after-they-are-sent
});


// Custom error handler
app.use((err, req, res, next) => {
  res.locals.error = err; // 'err' is an object that holds data about the error.
  err.status = 500; // <— Bug causing code 2/2
  res.render('error'); // send the error template to the client
});

// can also do app.listen and remove the http module at the top, but http.listen needed for socket.io
http.listen(3000, () => { // Element 3/3 of a basic Express App
    console.log('The application is running on localhost:3000!'); // this shows in the terminal, not the browser console.
    //console.log(app.locals);
}); // this sets up the local development server on port 3000
