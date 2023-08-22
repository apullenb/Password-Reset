module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL, 
  SENDGRID_TEMPLATE: process.env.SENDGRID_TEMPLATE,
  SENDGRID_BEARER: process.env.SENDGRID_BEARER
};