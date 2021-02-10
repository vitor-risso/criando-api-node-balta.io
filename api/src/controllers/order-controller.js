'use strict';

const repository = require('../repositories/order-repository');
const authService = require('../services/auth-service');

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

    //recuperar o token
    const token = req.body.token || req.query.token || req.headers['x-acess-token'];

    //decode token
    const data = await authService.decodeToken(token);

    await repository.create({
      customer: data.id,
      number: guid.raw().substring(0,6),
      items: req.body.items
    })
    res.status(201).send({message:'Pedido feito com sucesso!'})
  } catch (error) {
    console.error(error)
    res.status(400).send({
      message:'Falha  ao cadastrar pedido'
    })
  }
};
