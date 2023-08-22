const express = require("express");
require("dotenv").config();
const { SENDGRID_EMAIL, SENDGRID_TEMPLATE } = require('../config')
const jsonParser = express.json();
const router = express.Router();
const sgMail = require('@sendgrid/mail');

dotenv.config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/test-email", async (req, res) => {
  try {
    const { user } = req.body
//Email template created in Sendgrid
const msg = JSON.stringify({
  from: {
    email: SENDGRID_EMAIL,
  },
  personalizations: [
    {
      to: [
        {
          email: `${user.email}`,
        },
      ],
      dynamic_template_data: {
        name: `${user.name}`,
        link: `${targetURL}/${user.id}`,
      },
    },
  ],
  template_id: SENDGRID_TEMPLATE,   //Customizations created in config file
});
    sgMail.send(msg)
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});