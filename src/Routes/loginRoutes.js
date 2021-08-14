const express = require("express");
const db = require("./dbQueries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");
const jsonParser = express.json();
const userRouter = express.Router();
const authorization = require("../../utils/authorization");
const createToken = require("../../middeware/CreatePWToken");

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
      newUser.password_hash = bcryptPassword;
      const addUser = await db.addNewUser(newUser);

      res.status(201).json("Account Created Successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  })

  // Login Route:
  .post("/login", jsonParser, async (req, res, next) => {
    const { username, password } = req.body;
    const loginUser = { username, password_hash: password };

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
      .comparePasswords(loginUser.password_hash, searchUsers[0].passwordHash)
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
