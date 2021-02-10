'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const authService = require('../services/auth-service');
const emailService = require('../services/email-service');

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
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })

    emailService.send(req.body.email,
      'Bem vindo ao meu coração', 
      global.EMAIL_TMPL.replace('{0}', req.body.name))

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

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })

    if(!customer){
      res.status(2404).send({
        message: 'user/psswd not found'
      });
      return;
    }

    const token = await authService.generateToken({
      email: customer.email, 
      name: customer.name
    })    

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    })
  } catch (error) {
    res.status(400).send({
      message:'Falha  ao cadastrar cliente'
    })
  }
};
