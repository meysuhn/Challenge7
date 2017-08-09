/*jshint esversion: 6 */

// An app.js file where you will set up your Express app and write your API calls

const express = require('express'); // Element 1/3 of a basic Express App

const app = express(); // Element 2/3 of a basic Express App
    // the express function returns an express application
    // the app variable is now the central part of our application

app.use(express.static('public')); // include the static files (things that don't need to be processed on server)


app.set('view engine', 'pug'); // set view engine to parameter pug. As result we don't need to 'require' pug.
  // The app.set method defines different settings in Express.
    // The second param just tells Express which template engine to use.
    // By default, Express will look in a folder called Views in the root of your project.


// Route 1
app.get('/', (req, res) => {
  res.render('index'); //.pug file extension not required. As view engine is already set to pug express knows to search for pug files

});

// Route 2
app.get('/hello', (req, res) => {
  res.send('<h1>Bonjour</h1>');

});


app.listen(3000, () => { // Element 3/3 of a basic Express App
    console.log('The application is running on localhost:3000!'); // this shows in the terminal, not the browser console.
}); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.








// Notes

// This code will create a server, and when I run it, the server will run on my machine.

// const express = require('express'); // Element 1/3 of a basic Express App

// const app = express(); // Element 2/3 of a basic Express App
    // the express function returns an express application
    // the app variable is now the central part of our application

// app.listen(3000, () => { // Element 3/3 of a basic Express App
    // console.log('The application is running on localhost:3000!');
// }); // this sets up the local development server on port 3000
  // the listen method can take an optional callback parameter, which is what we've done here.
