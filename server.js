const express = require('express');
const server = express();

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

//3rd party middleware
const helmet = require('helmet');
const morgan = require('morgan');

server.use(logger);
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const {method, url} = req;

  const timestamp = Date.now().toString();

  console.log(`${method} to ${url} @ ${timestamp}`);
 
  next();
}



module.exports = server;
