/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser'); // this is middleware
const cookieParser = require('cookie-parser'); // this is middleware

const app = express(); // the express function returns an express application
    // the app variable is now the central part of our application
    // we'll extend it thoughtout the couse by adding routes, middleware and other settings.

app.use(bodyParser.urlencoded({ extended: false}));
// Body-parser contains several parses, the different ways the clients can send data. HTML forms normally encode the data they send the same way URLs do. So, we'll need to use the urlencode parser. We'll pass in an object, turning parser's extended option.
		// Don´t worry too much about this line of code. To be honest, I have to look this up everytime I need to include it in my Express applications.
app.use(cookieParser());
app.use('/static', express.static('public')); // include the static files (things that don't need to be processed on server)

app.set('view engine', 'pug');  // set the view engine to the param 'pug'
  // the app.set method defines dif settings in express
  // re-watch https://teamtreehouse.com/library/using-pug-in-your-express-app for more details


const mainRoutes = require('./routes'); //import routes. Because it's in the 'index' file, the file doesn't need to be specifically referred to.
  // this brings in all the modularised routes
const cardRoutes = require('./routes/cards'); // import the flashcard routes


app.use(mainRoutes); // use the routes variable to make middleware
app.use('/cards', cardRoutes); // You can add a path as a first argument to mount routes to.


// any request that makes it this far but hasn't found a route yet will trigger the 404 error.
app.use((req, res, next) => {
  const err = new Error('Not Found'); // this is the 'new Error' constructor
  err.status = 404; // manually adding an error code to the error object.
  next(err); // pass in the error object as an argument to the next function call.
  // the 'next' function in express signals the end of middleware functions
    //an app will hang if middleware is not closed out with a next().
    // Alternatively, sending a response will signal an end to middleware even if next() is not present.
});

// This is our error handler
  // see this vid: https://teamtreehouse.com/library/error-handling-middleware
app.use((err, req, res, next) => { // 4 parameters, the first being err. If no error middleware specified JS's native error object is used.
  res.locals.error = err;
  res.status(err.status); // here we're just manually creating the error status as a workaround for JS not having codes natively.
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
}); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.


// Lessons Learnt:
  // Static v Dynamic
    // Static files like images and style sheets don't need to be processed by the application. They just need to be delivered to the browser.

  // for sequencing and understanding Express' execution flow see: https://teamtreehouse.com/library/the-next-function-and-a-closer-look-at-middleware

  // Developers will often have a local database (a local file of data) for testing before building the main database later.
    // This is known as a flat data file.

  // ERROR HANDLING IN EXPRESS
  // In Express, you can use the next function to signal an error in your app.
  		//By passing an object as a parameter to next, Express knows there is an error to handle. Express will then immediately terminate and handle the error.
  // http codes aren't a native part of JavaScript's error object.

  //A 404 signals that the user requested the route that is exist.
  		//Remember, when an app gets a request, it will go from one app.use call to the next looking for a match. If it gets to the end without finding a route and there are no errors, Express' native handler will send a 404 back to the client with some plain text. If we catch the request before it gets to the end of the line, we can send users a better page.

  // read the data from the stored cookie.
    // now with the cookie, if the browser is refreshed the name is still displayed and data not lost.
      // NOTE NEVER STORE SENSITIVE DATA IN COOKIES!! They're in plain text and could be seen by anyone.

  // The express server needs to be restarted to apply any new routes or changes made in development.
    // We can do this from the command line by hitting Ctrl+C to stop the server.
    // Since the server is stopped, we'll need to start it back up the same way we did the first time.


  // app.get('/hello', (req, res) => {
  //   res.send('<h1>Hello, Javascript Developer!</h1>'); // the send method sends a string to the client
  // });


  // APP.USE
  // You'll often pass middleware as an anonymous function into the app.use method
  // Earlier middleware run before later ones. They are sequential as they appear in the code.
    //this is even the case when more than one function passed to app.use, as in the case of 'one' and 'one and a half' below
      // app.use((req, res, next) => {
      //   console.log('One');
      //   next();
      // },
      // (req, res, next) => {
      //   console.log('One and a half');
      //   next();
      // });
      //
      // app.use((req, res, next) => {
      //   console.log('Two');
      //   next();
      // });


  // CLOSURES
  // // An outer function that returns an inner function is known as a closure.
  // function middleware() {
  //   return function(req, res, next) { // this function is known as a closure!
  //     // middleware logic
  //   };
  // }
