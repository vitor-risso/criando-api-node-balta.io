'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  //_id é criado automaticamente
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Costumer', schema)
