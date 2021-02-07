'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

exports.post = async (req, res, next) => {

  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, "O nome deve ter no minimo 3 caracteres");
  contract.isEmail(req.body.email, "Email inválido!");
  contract.hasMinLen(req.body.password, 6, "A senha deve ter no minimo 6 caracteres");

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
  
  try {
    await repository.create(req.body)
    res.status(201).send({message:'Cliente cadastrado com sucesso!'})
  } catch (error) {
    res.status(400).send({
      message:'Falha  ao cadastrar cliente'
    })
  }
};

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({message: "Falha ao listar produtos", err: error})
  }
}
