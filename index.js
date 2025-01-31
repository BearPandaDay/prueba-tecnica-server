const mongoose = require('mongoose');
const app = require('./app');
const {
  IP_SERVER,
  API_VERSION,
  DB_PASSWORD
} = require('./constants');

const DB_URI = `mongodb://${IP_SERVER}:${DB_PASSWORD}/test `;
const PORT = process.env.PORT || 3000;
console.log("🚀 ~ DB_URI:", DB_URI)

mongoose.connect(DB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then((res) => {
    if(res) {
      app.listen(PORT, () => {
        console.log();
        console.log('*********************************************************************');
        console.log('*********************************************************************');
        console.log('********                                                      *******');
        console.log(`********    SERVER RUNING IN: http://${IP_SERVER}:${PORT}/api/${API_VERSION}    *******`);
        console.log('********                                                      *******');
        console.log('*********************************************************************');
        console.log('*********************************************************************');
        console.log();
      });
    }
  })
  .catch(error => {
    console.log("🚀 ~ SERVER ERROR:", error);
  });
