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
var server = require('http').createServer(app);


// var io = require('socket.io')(server);
// io.on('connection', function(){ /* … */ });


//const path = require('path'); // Not sure if this is necessary
app.locals.moment = require('moment'); // This allows moment to be used within a jade template
  // NOTE could do with understanding express locals better

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


// Timeline Route
app.use((req, res, next) => {
  T.get('statuses/user_timeline', {count: 5 },  function (err, data, response) {

    // Create the time/date of the tweet.
      //adds a key/value pair to the tweet objects in the data array
      // Twitter provides created_at time in seconds since the tweet.
    for (var i = 0, len = data.length; i < len; i++) {
      var tweetTimeStamp = (moment(data[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en')); // convert 'created_at' seconds since to Moment date format
      var timeNow = moment(); // get the current date
      var et = timeNow.diff(tweetTimeStamp, 'seconds'); // Calculate Elapsed Time in seconds between now and tweet
      let tweetTime = '';

      if (et <= 10) {
        tweetTime = "Just Now";
      } else if (et <= 59) {
        tweetTime = et + "s"; // seconds
      } else if (et>=60&&et<3600) { //if greater than 60 seconds & less than one hour
        tweetTime = Math.round(et/60) + "m"; // minutes
      } else if (et>=3600&&et<86400) {
        tweetTime = Math.round(et/3600) + "h"; // hours
      } else if (et >= 86400&&et<31536000){ // amount of seconds in one common calendar year.
          //NOTE this wouldn't be good enough for preoduction code. Doesn't take into account leap years
        tweetTime = moment(tweetTimeStamp).format("MMM DD"); // date within the last year
      } else {
        tweetTime = moment(tweetTimeStamp).format("DD MMM YYYY"); // date over a year ago
      }
      data[i].tweetTime = tweetTime; // add the new key / value pair to their respective object
    }
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
    //console.log("The Beast! " +moment(moment(res.messages[0].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en')).fromNow()); // this is perfect for the message bit

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
  timelineTweets = res.timeline;
  following = res.following;
  messages = res.messages;
  var screen_name = "@" + timelineTweets[0].user.screen_name; // this is for the header.
  var profileImageUrl1 = timelineTweets[0].user.profile_image_url;
  var followerCount = timelineTweets[0].user.friends_count;
  var banner = timelineTweets[0].user.profile_banner_url;
  var time =
 res.render('index', {banner, followerCount, screen_name, timelineTweets, following, messages});
});



app.use((err, req, res, next) => {
  res.locals.error = err;
  res.render('error'); // send the error template to the client
});

server.listen(3000, () => { // Element 3/3 of a basic Express App
    console.log('The application is running on localhost:3000!'); // this shows in the terminal, not the browser console.
}); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.
