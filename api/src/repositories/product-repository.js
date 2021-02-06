'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
  const res = await Product 
    .find({
      active: true
    }, 'title price slug' ) //segundo parametro do find são as areas que voce quer ver

    return res
}

exports.getBySlug = async (slug) => {
  const res = await Product.find({ slug: slug, active:true  }, 'title description price slug tags') //segundo parametro do find são as areas que voce quer ver
  return res
}

exports.getById = async (id) => {
  let res = await Product.findById(id);
  return res;
}

exports.getByTag = async (tag) => {
  let res = await Product.findOneAndUpdate(tag);
  return res
}

exports.create = async (data) => {
  let product = new Product(data);
  await product.save();
}

exports.edit = async (id, data) => {
  await Product
  .findByIdAndUpdate(id, {
    $set:{
      title: data.title,
      description: data.description,
      price: data.price
    }
  })
} 

exports.delete = async (id) => {
  await Product
  .findOneAndRemove(id)
}
