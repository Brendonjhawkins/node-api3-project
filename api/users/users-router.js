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
res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert({ name: req.name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser,  (req, res, next) => {
  User.update(req.params.id, {name: req.name})
  .then(() => {
    return User.getById(req.params.id)
  })
  .then(user => {
    res.json(user);
  })
  .catch(next);
}); 

router.delete('/:id', validateUserId, async (req, res, next) => {
  try{
     await User.remove(req.params.id)
     res.json(req.user)
  }
  catch(err){
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const results = await User.getUserPosts(req.params.id)
    res.json(results)
 }
 catch(err){
   next(err)
 }
});

router.post('/:id/posts', validateUserId, validatePost,  async (req, res, next) => {
  try{
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  } catch(err){
    next(err)
  }
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