// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Animal = require('../models/animal')
const Comment = require('./../models/comment')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.post('/comments/:id', requireToken, (req, res, next) => {
  // set owner of new animal to be current user
  const commentData = req.body.comments
  console.log(req.body.comments)
  commentData.owner = req.user.id
  console.log(req.params.id)

  Animal.findById(req.params.id)
    .then(handle404)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(animal => {
      animal.comments.push(commentData)
      return animal.save() // save the updated animal with its new comment
    })
    .then(animal => res.status(201).json({ animal: animal.toObject() }))

    .catch(next)
})

module.exports = router
