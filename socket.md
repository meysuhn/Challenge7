#nhampton
It’s not that simple, that’s why you’re probably having a problem with it. I would recommend:

- Using the <form> element to make a POST request to the server with the tweet
  // CM I think mine does this already?

- Catching that POST request with an express route and inside that route, using Twit to make a POST request to Twitter with the tweet.
  // CM I think mine does this already?

- Use Twit to listen to the Twitter streaming API endpoint for the user timeline
  // I think I've had something like this when playing around with it
    // Try to get this tweet to console.log before moving on

- This is where socket.io comes in. When Twit gets an update on the streaming timeline endpoint, use socket.io to send the timeline update to the client (browser)
  // ... see next point below for what this means

- On the client (browser) side, you’ll need a javascript file to listen to the socket.io instance on the server with a socket.io client instance on the browser (looks like an event listener when you get it set up) and append the new tweet on the top of the timeline using DOM manipulation
  // This is the tricky bit for me. What file is the client? the pug stuff? NOTE see below conversation
  // DOM manipulation should be fairly easy.

So, like I said, not really that simple. Kinda like setting up another half-server/client on the side. Thus the exceeds. (edited)

#debs_obrien
Thanks @nhampton. Yeh i knew it wasnt gonna be simple. But it would be pretty amazing to conquer it all the same and would look great on my portfolio so gotta give it a try. Loving express and actually i dont find it too difficult. My main problem is basic JavaScript or probably basic programming thinking. Thats where i seem to get lost. So basically i need a JavaScript file that the pug calls which acts as the event listener and posts to the socket???? And another one that appends the tweet from the socket ??

And @nhampton just to make sure Im getting it I cant add an event.listener or append into app.js as i cant mix JavaScript with express. Would that be correct? So if i wanted to create a function for the date I would have to also create and call a js file or I am going off track

#nhampton
Ok, so the javascript file on the front end (which will go in your public folder) is going to use socket.io. Socket.io, when implemented on the client side, looks a little like an event listener, with a specific event string that it’s listening for on the websocket, and a callback it runs when it receives that type of message.

Inside of that callback, you’re going to use DOM manipulation to append the tweet (which is the message that came to it on the websocket) to the top of the timeline.
