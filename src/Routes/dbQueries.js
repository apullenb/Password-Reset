const bcrypt = require("bcrypt");

const dbQueries = {


    findUser(knex, user) {
       return knex
       .from('user')
       .select('*')
       .where('user_name', user)
       .first();
   },
   addNewUser(knex, newUser) {
       return knex
         .insert(newUser)
         .into('user')
         .returning('*')
         .then(rows => {
           return rows;
         });
     },
   // Compare the password received from request with the encrypted password stored in the database
 comparePasswords(password, hash){
  return bcrypt.compare(password, hash);
 },


 
   }


   module.exports = dbQueries;