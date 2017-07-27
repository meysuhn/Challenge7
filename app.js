/*jshint esversion: 6 */

const express = require('express'); // Element 1/3 of a basic Express App
const app = express(); // Element 2/3 of a basic Express App
    // the express function returns an express application
    // the app variable is now the central part of our application
var moment = require('moment');
var Twit = require('twit');
var config = require('./config.js'); // bring in the config file
var T = new Twit(config); //NOTE i'm hoping this is how to correctly bring in auth data.
const bodyParser = require('body-parser');
//const path = require('path'); // Not sure if this is necessary

//NOTE not quitue sure if this is necessary? It's for the tweet bit
app.use(bodyParser.urlencoded({ extended: false}));

var router = express.Router(); // router constructor to create a new router
  // a router is kind of like a mini app in Express. You can add middleware and routes to it.

//app.set('views', path.join(__dirname, 'views')); // Not sure if this is necessary
app.set('view engine', 'pug'); // set view engine to parameter pug. As result we don't need to 'require' pug.
  // The app.set method defines different settings in Express.
    // The second param just tells Express which template engine to use.
    // By default, Express will look in a folder called Views in the root of your project.

app.use(router);
app.use(express.static('public')); // include the static files (things that don't need to be processed on server)

// Moment Stuff
//   var twitterTimeStamp = (moment(created0, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en'));
//   //console.log(twitterTimeStamp);
//   // console.log(moment().from(twitterTimeStamp, 'true'));
//   // console.log(moment().diff(twitterTimeStamp, 'true'));
//
//   // if (et <= x) // seconds
//   //  // display 'just now'
//   //  else if (et <= x) // minute
//   //   // minutes ago



// Timeline Route
app.use((req, res, next) => {
  T.get('statuses/user_timeline', {count: 10 },  function (err, data, response) {
    //console.log(moment([2007, 0, 29]).fromNow()); // 4 years ago
    //var created0 = timelineTweets[3].created_at;
    res.timeline = data; // pass follower data down to next method
    next(err); // an app will hang if middleware is not closed out with next()
    });
});

// Following Route
app.use((req, res, next) => {
  T.get('friends/list', {count: 5 },  function (err, data, response) {
    res.following = data.users; // pass follower data down to next method
    next(err);
    });
});

// Messages Route
app.use((req, res, next) => {
  T.get('direct_messages', {count: 5 },  function (err, data, response) {
    res.messages = data;
    next(err);
    });
});



app.post('/',(req, res, next) => {
  let userTweet = req.body.userTweet;
  console.log(userTweet);
  // The code below does actualy send a tweet. Comment out during dev!
  //T.post('statuses/update', { status: userTweet });
  res.render('index');
  // NOTE This doesn't feel quite right. for example, meysuhn is lost in the header after a twitter post.
});









app.get('/', (req, res) => {
  //headerData = res.headerData;
  timelineTweets = res.timeline;
  following = res.following;
  messages = res.messages;
  var screen_name = "@" + timelineTweets[0].user.screen_name; // this is for the header.
  var profileImageUrl1 = timelineTweets[0].user.profile_image_url;
  var followerCount = timelineTweets[0].user.friends_count;
  var banner = timelineTweets[0].user.profile_banner_url;
  var banner2 = timelineTweets[0].user.profile_background_image_url_https;
  //console.log(timelineTweets);
  // console.log(banner);
  // console.log(banner2);
  //console.log(following);
 res.render('index', {banner, followerCount, screen_name, timelineTweets, following, messages});
});






app.use((err, req, res, next) => {
  res.locals.error = err;
  res.render('error'); // send the error template to the client
});

app.listen(3000, () => { // Element 3/3 of a basic Express App
    console.log('The application is running on localhost:3000!'); // this shows in the terminal, not the browser console.
}); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.
