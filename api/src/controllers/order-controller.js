'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({message: "Falha ao listar produtos", err: error})
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    return res.status(200).send({message: "Pedido removido"})
  } catch (error) {
    res.status(500).send({message: "Pedido nao foi encontrado"})
  }
}

exports.post = async (req, res, next) => {
 
  try {
    await repository.create({
      customer: req.body.customer,
      number: guid.raw().substring(0,6),
      items: req.body.items
    })
    res.status(201).send({message:'Pedido feito com sucesso!'})
  } catch (error) {
    res.status(400).send({
      message:'Falha  ao cadastrar pedido'
    })
  }
};
