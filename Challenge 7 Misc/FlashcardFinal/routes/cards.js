/*jshint esversion: 6 */

// this routes module is used for the flashcard routes

const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');// require the flat data file. Flat data file meaning that it's just a locally stored data file for testing.
  // Store the JSONs data property into a constant, named data.
const { cards } = data; // Install the card data separately. the cards data in the flat data file is the main bit we will use, hence storing it seperately for ease.
  // This is ES6 syntax, equivalent to saying const cards = data.cards. Same with data above.

// this method for displaying random cards.
router.get( '/', ( req, res ) => {
  const numberOfCards = cards.length; // length prop on cards array
  const flashcardId = Math.floor( Math.random() * numberOfCards ); // generate random number
  res.redirect( `/cards/${flashcardId}` );
});

router.get('/:id', (req, res) => { //':id' tells express to treat this part of the URL as a variable or a route parameter named 'id'
  // The value for the route parameter from the URL will be stored in the request object params property.
    const { side } = req.query; // this is something to do with query strings. See https://teamtreehouse.com/library/card-template
    const { id } = req.params; // create a variable to hold the ID from the route parameter

    // check for the presence of a side
    if ( !side ) {
        return res.redirect(`/cards/${id}?side=question`); // if side doesn't exist redirect to same card with query string pointing to question side.
        // using return stops the function execution, as continuoing means the url handler is trying to redirect AND render, which causes an error.
    }
    const name = req.cookies.username; // give cards.js access to the cookie
    const text = cards[id][side]; // stores two pieces of text that we want to use.
    const { hint } = cards[id]; // store a reference to the hint.

    const templateData = { id, text, name, side };
    // wrap the text into an object that I can pass into the template.
      // pass the name into the template
      // pass in the id to the template data.

    if ( side === 'question' ) {
      templateData.hint = hint; // set the hint property to equal 'hint' when the side is holding the question string
      templateData.sideToShow = 'answer'; //side to show changes depending on which side the user points to.
      templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer' ) {
      templateData.sideToShow = 'question'; //side to show changes depending on which side the user points to.
      templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});

module.exports = router; // export the router
