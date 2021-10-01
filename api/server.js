const express = require('express'); 
const helmet = require('helmet'); 
const {logger} = require('./middleware/middleware')
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());
server.use(helmet()); 
server.use('/api/users', logger, usersRouter);

server.get('/', logger, (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.use('*', (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` })
});

server.use(errorHandling)

module.exports = server;

// function logger(req, res, next) { 
//   console.log(`it is a ${req.method} request to ${req.originalUrl}`)
//   next() 
// }
// eslint-disable-next-line
function errorHandling(err, req, res, next) { 
  res.status(err.status || 500).json({
    message: err.message,
  })
}