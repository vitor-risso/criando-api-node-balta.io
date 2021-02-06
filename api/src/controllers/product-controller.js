'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
  Product.find({ active: true }, 'title price slug') //segundo parametro do find são as areas que voce quer ver
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(400).send({
        message: "Erro ao carregar produtos",
        error: err
      })
    })
}

exports.getBySlug = (req, res, next) => {
  Product.find({ slug: req.params.slug, active:true  }, 'title description price slug tags') //segundo parametro do find são as areas que voce quer ver
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(400).send({
        message: "Erro ao carregar produtos",
        error: err
      })
    })
}

exports.getById= (req, res, next) => {
  Product.findById(req.params.id)
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(400).send({
        message: "Erro ao carregar produtos",
        error: err
      })
    })
}

exports.getByTag= (req, res, next) => {
  Product.findOneAndUpdate(req.params.tag)
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        message: "Erro ao carregar produtos",
        error: err
      })
    })
}

exports.post = (req, res, next) => {
  let product = new Product(req.body)
  // let product = new Product();
  // product.title = req.body.title;
  // product.description = req.body.description;
  // product.slug = req.body.slug;
  // product.price = req.body.price;
  // product.active = req.body.active;
  // product.tags = req.body.tags;

  product.save()
    .then(result => {
      res.status(201).send({message:'Produto cadastrado'})
    })
    .catch(err => {
      res.status(400).send({
        message:'Falha  ao cadastrar produto'
      })
      console.error('Nao deu nao', err)
    });

};

exports.put = (req, res, next) => {
  Product
    .findByIdAndUpdate(req.params.id, {
      $set:{
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
      }
    })
    .then(x => {
      res.status(200).send({
        message: "O produto foi atualizado com sucesso!"
      })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        message: "O produto não foi atualizado , ERRO",
        err: err
      })
    })  
    })
};

exports.delete = (req, res, next) => {
  Product
    .findOneAndRemove(req.body.id)
    .then(x => {
      res.status(200).send({
        message: "O produto foi removido com sucesso!"
      })
    .catch(err => {
      console.log(err)
      res.status(400).send({
        message: "O produto não foi removido , ERRO",
        err: err
      })
    })  
  })
};
