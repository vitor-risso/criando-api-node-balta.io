'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
  const res = await Order.find({}) //.populate()-> depois ver pq nao esta funionando
  return res
}

exports.create = async (data) => {
  let order = new Order(data);
  await order.save();
}

exports.delete = async (id) => {
  await Order
  .findOneAndRemove(id)
}
