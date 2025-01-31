const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();
// Import routings
const auth = require('./router/auth');
const user = require('./router/user');


// Configure Bory Parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static('uploads'));

// Configure Header HTTP - CORS
// const allowedOrigin = 'https://creinnova-client.vercel.app';

app.use(cors({
  // origin: allowedOrigin,
  // optionsSuccessStatus: 200
}));

// app.use((req, res, next) => {
//   const origin = req.headers.referer;
//   // console.log("@@@@@@@@@@@@@@@@@@@@@@",origin.startsWith(allowedOrigin)); // verifica sii el origen del dominio de versel empieza con allowedOrigin
//   if (origin && origin.startsWith(allowedOrigin)) {
//     // console.log("si entro")
//     next();
//   } else {
//     return res.status(403).send('Access forbidden: Invalid origin');
//   }
// });

// Configure routings
app.use(`/api/${API_VERSION}`, auth);
app.use(`/api/${API_VERSION}`, user);

module.exports = app;

