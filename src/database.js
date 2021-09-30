const mongoose = require("mongoose");
const config = require("./config");

(async () => {
  try {
    const db = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Mongodb esta conectado", db.connection.host);
  } catch (error) {
    console.error(error);
  }
})();
