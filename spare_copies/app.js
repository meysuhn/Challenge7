/*jshint esversion: 6 */

const express = require('express'); // Element 1/3 of a basic Express App
const app = express(); // Element 2/3 of a basic Express App
    // the express function returns an express application
    // the app variable is now the central part of our application
var moment = require('moment');
var Twit = require('twit');
var config = require('./config.js'); // bring in the config file
var T = new Twit(config); //NOTE i'm hoping this is how to correctly bring in auth data.
app.use(express.static('public')); // include the static files (things that don't need to be processed on server)
app.set('view engine', 'pug'); // set view engine to parameter pug. As result we don't need to 'require' pug.
  // The app.set method defines different settings in Express.
    // The second param just tells Express which template engine to use.
    // By default, Express will look in a folder called Views in the root of your project.



//Timeline Route
T.get('statuses/user_timeline', {count: 10 },  function (err, data, response) {
  let timelineTweets = data;
  var screen_name = "@" + timelineTweets[0].user.screen_name; // this is for the header.
  var profileImageUrl1 = timelineTweets[0].user.profile_image_url;
  //console.log(moment([2007, 0, 29]).fromNow()); // 4 years ago
  var created0 = timelineTweets[3].created_at;


  var twitterTimeStamp = (moment(created0, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en'));
  //console.log(twitterTimeStamp);
  // console.log(moment().from(twitterTimeStamp, 'true'));
  // console.log(moment().diff(twitterTimeStamp, 'true'));

  // if (et <= x) // seconds
  //  // display 'just now'
  //  else if (et <= x) // minute
  //   // minutes ago



  
  app.get('/', (req, res) => {
    res.render('index', { // res.render is to 'render' pug template on the specified url, in this case index a.k.a /
    timelineTweets,
      screen_name: screen_name, // this is for the header.
        // NOTE I think you need a separate route for this and the following count
    });
  });
});


// //Followers Route
// T.get('followers/list', {count: 5 },  function (err, data, response) {
//   let followers = data.users;
//   //console.log(followers[0].name);
//   //console.log(followers[0].screen_name);
//   app.get('/', (req, res) => {
//     //console.log(followers);
//     res.render('index', {followers} // res.render is to 'render' pug template on the specified url, in this case index a.k.a /
//     );
//   });
// });
//
// //Messages Route
// T.get('direct_messages', {count: 5 },  function (err, data, response) {
//   let messages = data;
//   // console.log(messages[1].text);
//   app.get('/', (req, res) => {
//     console.log(messages[1].text);
//     res.render('index', {messages} // res.render is to 'render' pug template on the specified url, in this case index a.k.a /
//     );
//   });
// });


// The code below does actualy send a tweet!
T.post('statuses/update', { status: 'API test' });
  // This to go in the footer and the value needs to come from the input


// In the Express vids Andrew got some user input, the name. So mimic that!


app.listen(3000, () => { // Element 3/3 of a basic Express App
    console.log('The application is running on localhost:3000!'); // this shows in the terminal, not the browser console.
}); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.








// Notes
// twit knows which Twitter user to get because of the config file

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
