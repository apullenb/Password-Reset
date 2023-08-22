require("dotenv").config();
const { SENDGRID_BEARER } = require('../config')

const sendGridConfig = (data) => {
    return { method: "post",
     url: "https://api.sendgrid.com/v3/mail/send",
     headers: {
       Authorization:
        SENDGRID_BEARER,
     },
     data: data,
 }
   };
 
   module.exports = sendGridConfig;