// This file contains my twitter auth data.
 // Do not upload this file to GitHub.

 var Twit = require('twit');

 var T = new Twit({
   consumer_key:         'qYoW9b6BifJjhfp14t6X8oH5g',
   consumer_secret:      'UDrzNn2Z2DTIJsWw8Whhv0K9hHzjU2Eg1KAiCpqIJeCSh5XmkG',
   access_token:         '938582958-f6tCFfPNAiI6u8OypCRDKHpZncGgwbCLC4cXezOA',
   access_token_secret:  'k60iUoZhQot3IsGKDDt65FCR04dpodyDs8Q7tG1HTZBGr',
   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
 });


// INSTRUCTIONS

 // To use and interact with the Twitter API, you’ll need to set up a way to give the Twitter API the set of keys and access tokens that were generated when you create your Twitter app. It’s a good idea to use an npm module to help you with this part. For this project, you’ll use an npm module called Twit. You can find a link in the project resources. Be sure to look through the documentation and familiarize yourself with how it works.
 // Create a file called config.js. In this file, you’ll assign an object literal to the module.exports object, as shown in the Twit documentation. The object literal should have the following properties with their corresponding values from your Twitter application account:
 // consumer_key
 // consumer_secret
 // access_token
 // access_token_secret
 // Import this code into your app.js file to authenticate your application so you can request data from the Twitter API. The config.js file must be listed in the .gitignore file so it won’t be committed to your github repository. This will prevent your keys and tokens from getting posted publicly to GitHub. It is very important that you do NOT upload any of your personal API keys / secrets / passwords to Github or other publicly accessible place.
 // When your project is reviewed, the project reviewer will use their own config file.
