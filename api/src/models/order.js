'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  //_id é criado automaticamente
  number:{
    type: String,
    required: true,
  },
  createDate:{
    type: Date,
    required: true,
    default: Date.now()
  },
  status:{
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created'
  },
  costumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Costumer'
  },
  items:[{
    quantity:{
      type: Number,
      required: true,
      default: 1
    },
    price:{
      type: Number,
      required: true,
    },
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }]
});

module.exports = mongoose.model('Order', schema)
