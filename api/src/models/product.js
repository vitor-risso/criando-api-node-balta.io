'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  //_id é criado automaticamente
  title:{
    type: String,
    required: true,
    trim: true
  },
  slug:{
    type: String,
    required: [true, 'O slug é obrigatório'],
    trim: true,
    index: true,
    unique: true
  },
  description:{
    type: String,
    required: true,
    trim: true
  },
  price:{
    type: Number,
    required: true
  },
  active:{
    type: Boolean,
    required: true,
    default: true
  },
  tags:[{
    type: String, 
    required: true
  }]
});

var Product = mongoose.model('Product', schema)

module.exports = {Product:Product}
