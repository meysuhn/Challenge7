/*jshint esversion: 6 */

// An app.js file where you will set up your Express app and write your API calls

const express = require('express'); // Element 1/3 of a basic Express App
const app = express(); // Element 2/3 of a basic Express App
    // the express function returns an express application
    // the app variable is now the central part of our application
var Twit = require('twit');
var config = require('./config.js'); // bring in the config file
var T = new Twit(config); //NOTE i'm hoping this is how to correctly bring in auth data.


// This is actually working.

// twit knows its meysuhn because of the config file!

//Timeline Route
T.get('statuses/user_timeline', {count: 5 },  function (err, data, response) {
  //console.log(data.text);
  var timelineTweets = data;
  var text = timelineTweets[0].text; // tweet text
  console.log(timelineTweets[0].created_at); // timestamp This one is hard. Search slack. Might need some logic to display time or data depending on age of tweet.
  var favouriteCount = timelineTweets[0].favorite_count;
  var name = timelineTweets[0].user.name;
  var screen_name = "@" + timelineTweets[0].user.screen_name;
  var profileImageUrl = timelineTweets[0].user.profile_image_url;
  var retweetCount = timelineTweets[0].retweet_count;
  app.get('/', (req, res) => {
    res.render('index', { // res.render is to 'render' pug template on the specified url, in this case index a.k.a /
      text: text,
      retweet: retweetCount,
      name: name,
      screen_name: screen_name,
      favouriteCount: favouriteCount,
      profileImageUrl: profileImageUrl
    });
  });

// NOTE When you come back to this on Saturday eve:
  // (1) You've got some data into the timeline. Well done.
    // You're having trouble getting the following working though:
      // screen_name, profileImageUrl and you've not tried the created_at yet.
        //screen_name is working in the header. But there's something about the way it is set up in timeline that isn't working. Prob an easy fix.

  // (2) At the moment you're only logging on the first one (index 0).
    //A loop of soe sort will be needed.
    // template literals may be needed along the way, not sure.


});



// The code below does actualy send a tweet!
//T.post('statuses/update', { status: 'I am tweeting via the API!' });
  // This to go in the footer and the value needs to come from the input


app.use(express.static('public')); // include the static files (things that don't need to be processed on server)


app.set('view engine', 'pug'); // set view engine to parameter pug. As result we don't need to 'require' pug.
  // The app.set method defines different settings in Express.
    // The second param just tells Express which template engine to use.
    // By default, Express will look in a folder called Views in the root of your project.

//use a loop in pug for this?
// https://teamtreehouse.com/library/using-logic-in-pug


// NOTE by moving this route to insude the t.get method I've been able to get the info into pug
// Route 1
// app.get('/', (req, res) => {
//   res.render('index', {retweet: "ANDDD"}); //a hardcoded variable for the timeline template
//   // i need to use template literal method.
//   //.pug file extension not required. As view engine is already set to pug express knows to search for pug files
//   // res.render is to 'render' pug template on the specified url, in this case index a.k.a /
// });

// Route 2
app.get('/hello', (req, res) => {
  res.send('<h1>Bonjour</h1>');

});


app.listen(3000, () => { // Element 3/3 of a basic Express App
    console.log('The application is running on localhost:3000!'); // this shows in the terminal, not the browser console.
}); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.








// Notes
//.pug file extension not required. As view engine is already set to pug express knows to search for pug files
// Logging JSON data to the console (in a node app that means the terminal)

// This code will create a server, and when I run it, the server will run on my machine.

// const express = require('express'); // Element 1/3 of a basic Express App

// const app = express(); // Element 2/3 of a basic Express App
    // the express function returns an express application
    // the app variable is now the central part of our application

// app.listen(3000, () => { // Element 3/3 of a basic Express App
    // console.log('The application is running on localhost:3000!');
// }); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.
