const express = require('express');
const userRouter = require('./users/userRouter');
const server = express();

// bleow we are bringing in the user Router we are creating in the other file and setting the sever to run the logger everytime it starts
server.use('api/users', userRouter);
server.get('/', logger, (rew, res) => {
  res.send(`<h2>Let's write some middleware</h2>`);
})
// below i have to make the call to the middleware function so that it actually works. 
server.use(logger);

//custom middleware
// below im finishing the logger functionality  by making it log the date and changing it to a string
// loggin athe request method, request url, and the timestamp
function logger(req, res, next) {
  console.log(req.url);
  console.log(`[${new Date().toISOString()}]) ${req.method} to ${req.url} ${req.get("Origin")}`
  )
  next();
}

module.exports = server;
