'use strict';

const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
  repository
    .get()
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
  repository
    .getBySlug(req.params.slug)
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
  repository
    .getById(req.params.id)
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
  repository
    .getByTag(req.params.tag)
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
  
  // let product = new Product();
  // product.title = req.body.title;
  // product.description = req.body.description;
  // product.slug = req.body.slug;
  // product.price = req.body.price;
  // product.active = req.body.active;
  // product.tags = req.body.tags;
  
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.description, 3, "O description deve ter no minimo 3 caracteres");
  contract.hasMinLen(req.body.title, 3, "O titulo deve ter no minimo 3 caracteres");
  contract.hasMinLen(req.body.slug, 3, "O slug deve ter no minimo 3 caracteres");

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  repository.create(req.body)
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
  repository.edit(req.params.id, req.body)
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
  repository.delete(req.body.id)
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
