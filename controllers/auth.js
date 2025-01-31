const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("../utils/jwt.js");

function postUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) res.status(400).send({ msg: "El email es obligatorio", status: false });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria", status: false });

    const userModel = new User({
      email: email.toLowerCase(),
      password,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    userModel.password = hashPassword;

    userModel.save().then((userStorage) => {
        return res.status(200).send({msg: userStorage, status: true});
      })
      .catch(error => {        
        return res.status(400).send({ msg: "Error usuario/email existente", status: false});
      });
  } catch (error) {
    return res.status(503).send({msg: "Algo fallo al ejecutar portUser", status: false});
  }
}

async function postSignIn(req, res) { 
  try {
    const { email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio", status: false });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria", status: false });

    const emailLowerCase = email.toLowerCase();

    const userStore = await User.findOne({ email: emailLowerCase })
    if (!userStore) return res.status(500).send({ msg: `User not found`, status: false });
    
    const check = await bcrypt.compare(password, userStore.password)
    if (!check) return res.status(400).send({ msg: "Contraseña incorrecta", status: false });
    
    console.log("🚀 ~ postSignIn ~ userStore:", userStore)
    return res.status(200).send({
      msg: { access: jwt.createAccessToken(userStore), refresh: jwt.createRefreshToken(userStore) },
      status: true
    });
  } catch (error) {
    return res.status(503).send({msg: `Algo fallo al ejecutar signIn: ${error}`, status: false})
  }
}

// async function refreshAccessToken(req, res) {
//   try {
//     const { token } = req.body;
  
//     if (!token) res.status(400).send({ msg: "Token requerido", status: false});
  
//     const { user_id } = jwt.decoded(token);
  
//     const response = await User.findOne({ _id: user_id });

//     if (!response) return res.status(500).send({ msg: "User not found", status: false });
      
//     return res.status(200).send({ accessToken: jwt.createAccessToken(response)})
//   } catch (error) {
//     return res.status(500).send({msg: "Error al ejecutar refreshAccesToken", status: false})
//   }
// }

module.exports = {
  postUser,
  postSignIn,
  // refreshAccessToken,
}
