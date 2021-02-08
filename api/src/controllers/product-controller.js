'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('guid');

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({message: "Falha ao listar produtos", err: error})
  }
}

exports.getBySlug = async (req, res, next) => {
  
  try {
    let data = await repository.getBySlug(req.params.slug)
    res.status(200).send(data)  
  } catch (error) {
    res.status(400).send({
      message: "Erro ao carregar produtos",
      error: error
    })
  }
}

exports.getById= async (req, res, next) => {
  
  try {
    let data = await repository.getById(req.params.id)
    res.status(200).send(data)
    
  } catch (error) {
    res.status(400).send({
      message: "Erro ao carregar produtos",
      error: error
    })
    
  }
}

exports.getByTag= async (req, res, next) => {
  
  try {
    let data = await repository.getByTag(req.params.tag)
    res.status(200).send(data)
  } catch (error) {
    res.status(400).send({
      message: "Erro ao carregar produtos",
      error: error
    })
  }
}

exports.post = async (req, res, next) => {
  
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

  try {
    // Criar o blob service
    const blobSvc = azure.createBlobService(config.containerConnectionString) ;
    
    let rawdata = req.body.image;
    let filename = guid.raw().toString() + '.jpg';
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');


    //salva img
    await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
      contentType: type
      }, function (error, result, response) {
        if (error) {
          filename = 'default-product.png'
        }
     });

    await repository.create({
      title: req.boddy.title ,
      slug: req.boddy.slug ,
      description: req.boddy.description ,
      price: req.boddy.price ,
      active: true,
      tags: req.boddy.tags ,
      image: 'https://cs21003200114e82215.blob.core.windows.net/product-images' + filename ,
    })
    res.status(201).send({message:'Produto cadastrado'})
  } catch (error) {
    res.status(400).send({
      message:'Falha  ao cadastrar produto'
    })
  }
};
exports.put = async (req, res, next) => {
  try{
    let data = await repository.edit(req.params.id, req.body)
    res.status(200).send({
      message: "O produto foi atualizado com sucesso!"
    })
  }catch(err)  {
      console.log(err)
      res.status(400).send({
        message: "O produto não foi atualizado , ERRO",
        err: err
      })
  }
};

exports.delete = async (req, res, next) => {
  try{
    await repository.delete(req.body.id)
    res.status(200).send({
      message: "O produto foi removido com sucesso!"
    })
  } catch(err) {
      console.log(err)
      res.status(400).send({
        message: "O produto não foi removido , ERRO",
        err: err
      })
  }
};
