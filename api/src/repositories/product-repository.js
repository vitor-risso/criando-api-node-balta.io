'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
  return Product 
    .find({
      active: true
    }, 'title price slug' ) //segundo parametro do find são as areas que voce quer ver
}

exports.getBySlug = (slug) => {
  return Product.find({ slug: slug, active:true  }, 'title description price slug tags') //segundo parametro do find são as areas que voce quer ver
}

exports.getById = (id) => {
  return Product.findById(id)
}

exports.getByTag = (tag) => {
  return Product.findOneAndUpdate(tag)
}

exports.create = (data) => {
  let product = new Product(data);

  return product.save()
}

exports.edit = (id, data) => {
  return Product
  .findByIdAndUpdate(id, {
    $set:{
      title: data.title,
      description: data.description,
      price: data.price
    }
  })
} 

exports.delete = (id) => {
  return   Product
  .findOneAndRemove(id)
}
