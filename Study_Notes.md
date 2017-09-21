# Notes

## Twit
Twit knows which Twitter user to get because of the config file

## Express
A `.pug` file extension not required; as the view engine is already set to pug express knows to search for pug files.

### A basic Express app
There are three elements to a basic Express App:

(1) const express = require('express');

(2) const app = express();
    // the express function returns an express application
    // the app variable is now the central part of our application

(3) app.listen(3000, () => {
    // console.log('The application is running on localhost:3000!');
    // }); // this sets up the local development server on port 3000
    // the listen method can take an optional callback parameter, which is what we've done here.

### app.locals
  `app.locals.moment = require('moment');` // This allows moment to be used within a jade template

### app.set
The app.set method defines different settings in Express.
  The second param just tells Express which template engine to use.
  By default, Express will look in a folder called Views in the root of your project.

## Don’t confuse WebSocket with AJAX! 
  AJAX does indeed allow for the client and the server to exchange information without reloading the page. However, in AJAX, it’s always the client that asks and the server that responds. The server can’t decide for itself to send information to the client. With WebSocket that has become possible!
