const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

// Funcion a la que se le pasa el usuario que se desea loguear
function createAccessToken(user) {
  const expToken = new Date();     // Expiracion de fecha del token
  expToken.setHours(expToken.getHours() + 3);     // En la fecha generada se setea por la hora actual mas 3 horas adicionales para saber la hora que se expirará

  // Datos que se van a querer guardar en el token
  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),     // Fecha en que se inicio seccion
    exp: expToken.getTime(),     // Fecha en que expira la seccion
  };

  // Se crea el JsonWebToken con los datos del payload
  return jwt.sign(payload, JWT_SECRET_KEY);
}

// Funcion a la que se le pasa el usuario que se desea loguear y refrescar la seccion para tener mas tiempo que no se cierre
function createRefreshToken(user) {
  const expToken = new Date();     // Expiracion de fecha del token
  expToken.getMonth(expToken.getMonth() + 1);     // En la fecha generada se setea por la hora actual mas 1 hora adicional para saber la hora que se expirará

  // Datos que se van a querer guardar en el token
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),     // Fecha en que se inicio seccion
    exp: expToken.getTime(),     // Fecha en que expira la seccion
  };

  // Se crea el JsonWebToken con los datos del payload
  return jwt.sign(payload, JWT_SECRET_KEY);
}

// Funcion para decodificar el token
function decoded(token) {
  return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};
