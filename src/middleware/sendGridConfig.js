require('dotenv').config();
const { SENDGRID_API_KEY } = require('../config');

const sendGridConfig = (data) => {
  return { method: 'post',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      Authorization:
        SENDGRID_API_KEY,
    },
    data: data,
  };
};
 
module.exports = sendGridConfig;