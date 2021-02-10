'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async (data) => {
  let customer = new Customer(data);
  await customer.save();
}

exports.get = async () => {
  const res = await Customer 
    .find({}) //segundo parametro do find são as areas que voce quer ver

    return res
}


exports.authenticate = async (data) => {
  const res = await Customer 
    .findOne({
      email: data.email,
      password: data.password
    }) //segundo parametro do find são as areas que voce quer ver

    return res
}
