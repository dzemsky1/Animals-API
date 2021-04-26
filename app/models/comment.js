'use strict'
// require the mongoose library
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
  body: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})
// export the SCHEMA, do not convert to model
module.exports = commentSchema
