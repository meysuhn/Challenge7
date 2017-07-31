/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const Twit = require('twit');
const config = require('../config.js'); // bring in the config file
const T = new Twit(config); // Bring in auth data. This has to be declared AFTER requiring the config file in order for it to work!
const moment = require('moment');



var stream = T.stream('user', {with: 'user'});

stream.on('tweet', function (tweet) {
  console.log(tweet);
});



// Timeline Route
router.use((req, res, next) => {
	T.get('statuses/user_timeline', {count: 5}, function(err, data, response) {
		// Create the time/date of the tweet. Adds a key/value pair to the tweet objects in the data array
		for (let i = 0, len = data.length; i < len; i++) {
			let tweetTimeStamp = (moment(data[i].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en')); // convert 'created_at' seconds since to Moment date format
			let timeNow = moment(); // get the current date
			let et = timeNow.diff(tweetTimeStamp, 'seconds'); // Calculate Elapsed Time in seconds between now and tweet
			let tweetTime = '';
			if (et <= 10) { // if elapsed time is <= to 10 seconds...
				tweetTime = "Just Now";
			} else if (et <= 59) {
				tweetTime = et + "s"; // seconds
			} else if (et >= 60 && et < 3600) { //if greater than 60 seconds & less than one hour
				tweetTime = Math.round(et / 60) + "m"; // minutes
			} else if (et >= 3600 && et < 86400) {
				tweetTime = Math.round(et / 3600) + "h"; // hours
			} else if (et >= 86400 && et < 31536000) { // amount of seconds in one common calendar year.
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
router.use((req, res, next) => {
	T.get('friends/list', {
		count: 5
	}, function(err, data, response) {
		res.following = data.users; // pass follower data down to next method
		//err.status = 500; // <— Bug causing code 1/2
		next(err);
	});
});

// Messages Route
router.use((req, res, next) => {
	T.get('direct_messages', {
		count: 5
	}, function(err, data, response) {
		res.messages = data;
		next(err);
	});
});

//Tweet Post Route
router.post('/', (req, res, next) => {
	let userTweet = req.body.userTweet;
	T.post('statuses/update', {
		status: userTweet
	}); // send tweet to Twitter via Twit
	//renderIndexPage();
	res.redirect('/'); // redirect back to the index screen after sending a tweet
	// NOTE This doesn't feel quite right. for example, meysuhn is lost in the header after a twitter post.
});

module.exports = router; // export the router so it can be referenced in the app.js file
