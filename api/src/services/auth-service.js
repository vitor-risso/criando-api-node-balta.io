'use-stric';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'});
}

exports.decodeToken = async(token) => {
  let data = await jwt.verify(token, config.SALT_KEY);
  return data;
}

exports.authorize = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-acess-token'];
  
  if(!token){
    res.status(401).send({message: "Acesso restrito"});
  } else{
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
      if(error){
        res.status(401).send({message: 'Token inválido'});
      } else {
        next();
      }
    })
  }
}
