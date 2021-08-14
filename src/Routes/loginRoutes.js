const express = require("express");
const db = require("./dbQueries");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { SENDGRID_EMAIL, SENDGRID_TEMPLATE } = require('../config')

const jwtGenerator = require("../../utils/jwtGenerator");
const jsonParser = express.json();
const router = express.Router();
const createToken = require("../middeware/CreatePWToken");

//Registration Route: Create a New User
router
.post("/add-user", jsonParser, async (req, res, next) => {
  const { name, username, password, email } = req.body;
  const newUser = {
    username,
    password,
    name,
    email,
  };

  try {
    const userCheck = await db.findUser(newUser.username);
    if (userCheck.length > 0) {
      return res.status(400).json({ error: "username not available" });
    }
    const saltRound = 3;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(newUser.password_hash, salt);
    newUser.password = bcryptPassword;
    const addUser = await db.addNewUser(newUser);

    res.status(201).json("Account Created Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
})

// Login Route: Match Username & Password with DB & Return Token for Login
.post("/login", jsonParser, async (req, res, next) => {
  const { username, password } = req.body;
  const loginUser = { username, password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });
  const searchUsers = await db.findUser(loginUser.username);
  if (searchUsers === undefined) {
    return res.status(400).json({
      error: "Incorrect username or password",
    });
  }
  return db
    .comparePasswords(loginUser.password, searchUsers[0].password)
    .then((compareMatch) => {
      if (!compareMatch) {
        return res.status(400).json({
          error: "Incorrect username or password",
        });
      }
      const token = jwtGenerator(searchUsers[0].id);
      res.json({ token, id: searchUsers[0].id });
    })
    .catch(next);
});


// Password Reset Route: Generates a token and sends this token as a link in an email through SendGrid
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const expires = moment().add(5, 'hours')
  const {targetURL} = req.body;
  const emailLookup = await db.findUserEmail(email)
  if (emailLookup.length === 0) {
    return res.status(400).json({
      error: "Email Address is Not Associated with Any Accounts",
    });
  }  
const name = emailLookup[0].name
const id = emailLookup[0].id
const token = createToken(email, id, name)
const fields = { token, is_used: 0, user_id: id, application:'Skincare Challenge - password reset', expiration_date: expires.toDate() }
const addToken = await db.insertToken(fields)

//Email template created in Sendgrid
    const data = JSON.stringify({
      from: {
        email: SENDGRID_EMAIL,
      },
      personalizations: [
        {
          to: [
            {
              email: `${email}`,
            },
          ],
          dynamic_template_data: {
            name: `${name}`,
            link: `${targetURL}/forgot-password/${id}/${addToken[0].token}`,
            expiration: `${moment(addToken[0].expirationDate).calendar()}`
          },
        },
      ],
      template_id: SENDGRID_TEMPLATE,
    });

    axios(sendGridConfig(data))
      .then(function (response) {
        
        res.status(201).json(response.data);
      })
      .catch(function (error) {
        console.error(err);
        res.status(500).json(err);       
      });
     
});


//Update user password
router.put("/reset-password/:id/:token", async (req, res) => {
  try {
    let newPass = req.body.password; 
    const { token } = req.params
    const { id } = req.params;
    
    const lookupToken = await db.matchToken(token)
   
    if (lookupToken.length > 0 && lookupToken[0].isUsed === false) {
      const useToken = await db.useToken(token)
    const searchUsers = await db.findUserById(id)
      if (searchUsers.length === 0) {
      return res.status(400).json({
        error: "Invalid Password Link",
      });
    }   
    const saltRound = 3;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(newPass, salt);
    newPass = bcryptPassword
    const user = await db.updatePassword(id, newPass);
    res.status(200).json(searchUsers[0].username);
    } else {
      return res.status(400).json({
        error: "Invalid Password Reset Link",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/reset-password/validate/:token", async (req, res) => {
  try {
    const { token } = req.params
    const lookupToken = await db.matchToken(token)
    if (lookupToken.length > 0 && lookupToken[0].isUsed === false) {
    return res.status(200).json(true);
    } else {
      return res.status(400).json({
        error: "Invalid Password Reset Link",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});




module.exports = router;

