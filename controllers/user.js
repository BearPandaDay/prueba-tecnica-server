const User = require("../models/user");

async function getMe(req, res) {
  try {
    
    const { user_id } = req.user;
  
    const response = await User.findById(user_id);
  
    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado usuario", status: false });
    } else {
      return res.status(200).send({msg: response, status: true});
    }
  } catch (error) {
    return res.status(503).send({msg: "Error al ejecutar getMe: ", status: false});
  }
}

module.exports = {
  getMe,
}
