'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//DB conection
mongoose.connect(config.connectionString, {
  "auth": {
    "authSource": "admin"
  },
  "user": "admin",
  "pass": "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(result => console.log('Conectou HEINNNN'))
  .catch(err => console.error('Erro na conexão com o banco ->', err) )

//Load models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Load routes
const indexRoutes = require('./routes/indexRoute');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(bodyParser.json()); // Faz com que toda req vira um json
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/customer', customerRoutes);
app.use('/orders', orderRoutes);


module.exports = app;
