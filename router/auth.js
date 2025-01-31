const express = require('express');
const AuthController = require('../controllers/auth.js');

const api = express.Router();

api.post("/auth/signup", AuthController.postUser);
api.post("/auth/signin", AuthController.postSignIn);
// api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);

module.exports = api;
