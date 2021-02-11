'use strict';

const config = require ('../config');
const { post } = require('../controllers/customer-controller');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async(to, subject, body) => {

  const request = sendgrid.emptyRequest({
    method:'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: to
            }
          ],
          subject: subject
        }
      ],
      from: {
        email: global.EMAIL
      },
      content: [
        {
          type: 'text/plain',
          value: body
        }
      ]
    }
  })

  await sendgrid.API(request)
  .then(response => {
   // console.log(response.statusCode);
    // console.log(response.body);
    // console.log(response.headers);
    console.log('email enviado com sucesso')
  })
  .catch(error => {
    //error is an instance of SendGridError
    //The full response is attached to error.response
    console.log(error.response.statusCode);
  });

}
