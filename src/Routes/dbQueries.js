
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
   
   
   }