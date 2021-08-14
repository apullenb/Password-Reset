module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SECRET_KEY: process.env.SECRET_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL, 
  SENDGRID_TEMPLATE: process.env.SENDGRID_TEMPLATE,
  SENDGRID_BEARER: process.env.SENDGRID_BEARER
}