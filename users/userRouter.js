const express = require('express');

const router = express.Router();

const userdb = require('./userDb')

const postdb = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
  // do your magic!
           userdb.insert(req.body)
           .then(post => {
                res.status(201).json(post)
           })
           .catch(error => {
               res.status(500).json({ error: "There was an error while saving the post to the database"})
           })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id
   post = {
    user_id: id,
    text: req.body.text,
  }
  postdb.insert(post)
  .then(post => {
      res.status(201).json(post)
  }).catch(error=>{
      console.log(error)
      res.status(500).json({errormessage: 'error getting data'})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  userdb.get()
  .then(users =>{
      res.status(200).json({users: users})
  })
  .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved."  })
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userdb.getById(req.params.id)
    .then(user =>{
        if(user.length){
        res.status(404).json({error: "The post with the specified ID does not exist."})
    } else {
        res.status(200).json({user: user})
    }
    })
    .catch(error => {
        res.status(404).json({message: "The post with the specified ID does not exist." })
    })
});

router.get('/:id/posts', validateUserId,  (req, res) => {
  // do your magic!
  userdb.getUserPosts(req.params.id)
  .then(posts =>{
          res.status(201).json(posts);
  })
  .catch(error => {
      res.status(500).json({ error: "The comments information could not be retrieved." })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userdb.remove(req.params.id)
  .then(post =>{
      if(post){ res.status(200).json(post)
      } else {res.status(404).json({message: "The post with the specified ID does not exist." })}
  })
  .catch(error => {
      res.status(500).json({ error: "The comments information could not be retrieved." })
  })
})

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // do your magic!
  userdb.update(req.params.id, req.body)
  .then(count => {
    res.status(200).json({ ...req.user, name: req.body.name })
  })
  .catch(err => {
    res.status(500).json({ message: "error could not update user on server" })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params

postdb.getById(id)
.then(post => {
  req.post = post
  next()
})
.catch(error => {
  res.status(400).json({ message: "invalid id" })
})
}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missing user data"})
} else if(!req.body.name){
    res.status(400).json({message: "missing required name field"})
} else {
  next()
}
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({errorMessage: "error getting body!."})
} else if(!req.body.text){
    res.status(400).json({errorMessage: "Please provide text/name for the comment."})
} else {
  next()
}
}

module.exports = router;

