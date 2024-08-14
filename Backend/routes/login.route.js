const express = require("express");
const { login, registerUser } = require("../controllers/auth.controller");

const user = express.Router();

user.post("/login", login);
user.post("/register", registerUser);

module.exports = user;
