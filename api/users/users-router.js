const express = require('express');
const User = require('../users/users-model');
const Post = require('../posts/posts-model')
const {
  validateUser,
  validateUserId,
  validatePost
} = require('../middleware/middleware')


const router = express.Router();

router.get('/', (req, res, next) => {
  User.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser,  (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId,  (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId,  (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost,  (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// eslint-disable-next-line
router.use ((err, req, res, next) => {
  res.status(err.status || 500).json({
     customMessage: 'error post routing',
     message: err.message,
     stack: err.stack
  })
})

// do not forget to export the router
module.exports = router