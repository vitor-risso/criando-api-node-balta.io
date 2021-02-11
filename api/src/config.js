global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';
global.EMAIL = 'risso.vitor.vitor37@gmail.com'

require('dotenv').config()

module.exports={
  connectionString: 'mongodb://localhost:27017/node-store',
  sendgridKey: process.env.SENDGRIDKEY,
  containerConnectionString: process.env.CONTAINERCONNECTIONSTRING
}
