const mongoose = require('mongoose')
const commentSchema = require('./comment')

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Animal', animalSchema)
