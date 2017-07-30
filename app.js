/*jshint esversion: 6 */

const express = require('express');
const app = express(); // // the app variable is now the central part of our application. Here is it Express.
const moment = require('moment');
const Twit = require('twit');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
app.locals.moment = require('moment'); // This allows moment to be used within a jade template
app.use(bodyParser.urlencoded({ extended: false})); //NOTE not quitue sure if this is necessary? It's for the tweet bit
const router = express.Router(); // router constructor to create a new router
app.use(router);
app.set('view engine', 'pug'); // set view engine to parameter pug. As result we don't need to 'require' pug.
app.use(express.static('public')); // include the static files (things that don't need to be processed on server)
const routes = require('./routes'); // Bring in the routes folder. Because it's named 'index' we don't need to refer to it.
app.use(routes); // use the routes variable I declared to make middleware


app.get('/', (req, res) => {
  timelineTweets = res.timeline;
  following = res.following;
  messages = res.messages;
  let screen_name = "@" + timelineTweets[0].user.screen_name; // this is for the header.
  let profileImageUrl1 = timelineTweets[0].user.profile_image_url;
  let followerCount = timelineTweets[0].user.friends_count;
  let banner = timelineTweets[0].user.profile_banner_url;
  let time =
 res.render('index', {banner, followerCount, screen_name, timelineTweets, following, messages});
 //next(err); // Can't have next(err) here for this reason https://stackoverflow.com/questions/34983520/express-js-routing-error-cant-set-headers-after-they-are-sent
});


// Custom error handler
app.use((err, req, res, next) => {
  res.locals.error = err; // 'err' is an object that holds data about the error.
  //res.status(err.status); // <— Bug causing code 2/2
  res.render('error'); // send the error template to the client
});

server.listen(3000, () => { // Element 3/3 of a basic Express App
    console.log('The application is running on localhost:3000!'); // this shows in the terminal, not the browser console.
}); // this sets up the local development server on port 3000
