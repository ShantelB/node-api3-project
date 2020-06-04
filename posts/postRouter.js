const express = require('express');

const router = express.Router();

const postdb = require('./postDb')

router.get('/', (req, res) => {
  // do your magic!
  postdb.get()
  .then(posts =>{
      res.status(200).json({posts: posts})
  })
  .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved."  })
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  postdb.getById(req.params.id)
  .then(post =>{
      if(post.length == 0){
      res.status(404).json({error: "The post with the specified ID does not exist."})
  } else {
      res.status(200).json({post: post})
  }
  })
  .catch(error => {
      res.status(500).json({error: "The post information could not be retrieved." })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  postdb.remove(req.params.id)
  .then(post =>{
      if(post){ res.status(200).json(post)
      } else {res.status(404).json({message: "The post with the specified ID does not exist." })}
  })
  .catch(error => {
      res.status(500).json({ error: "The comments information could not be retrieved." })
  })
  })


router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "provide text for the post." })
} else {
    postdb.update(req.params.id, req.body)
    .then(post => {
        if (req.body) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist, please try again." })
        }
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be modified" })
    })
}
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
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

module.exports = router;
