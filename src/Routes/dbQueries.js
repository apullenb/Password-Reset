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

// Insert password verification token
 insertToken (data) {
  return db("tokens")
  .insert(data)
  .returning("*");
},

// Lookup token for password verification
 matchToken(data) {
  return db("tokens")
    .select("*")
    .where("token", "=", data)
    .returning("*");
},

useToken(data) {
  return db("tokens")
    .where("token", "=", data)
    .update("isUsed", 1)
    .returning("*");
},

updatePassword(id, password) {
  return db("users")
    .where("id", "=", id)
    .update("password", password)
}

   }


   module.exports = dbQueries;