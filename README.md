# Challenge7
TH TechDegree Challenge 7

This is nearly completed; just 3 outstanding issues:

(1) Posting a Tweet
I can post a tweet that shows up on twitter.com, but when I refresh my app’s page in the browser one of two things will happen: either I get a straight up stack trace saying that certain data is undefined, or the page will render most of the app, but without the header. I think this is something to do with the way I’ve got the routing arranged, but I haven’t been able to resolve it.

I’d like to finish off by adding in the auto refresh functionality, but need to fix up this error first.

(2) adding in socket.io functionality

(3) Error Handler
I’ve got the error handler working in part, but when I try to add a generic 500 status code, as shown in the Express vids, it’s breaking with the terminal message `TypeError: Cannot set property 'status' of undefined` & the browser saying `This site can’t be reached`. 

I’ve tried implementing the error handler as shown in the Express vids, as below below:
```router.use((err, req, res, next) => {
  T.get('friends/list', {count: 5 },  function (err, data, response) {
    res.following = data.users;
    err.status = 500; // <— Bug related code 1/2
    next(err);
    });
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status); // <— Bug related code 2/2
  res.render('error');
});

