const express = require('express');
const UserController = require('../controllers/user');
const { asureAuth } = require('../middlewares/authenticated');

const api = express();

api.get('/user/me', [asureAuth], UserController.getMe);

module.exports = api;