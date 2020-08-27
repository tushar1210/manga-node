import mongoose = require('mongoose')

let Schema = mongoose.Schema

let user = new Schema({
  id: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  pass: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  favourities: {
    type: [String],
    required: false
  }
})

export let User = mongoose.model('User', user)
