// Read environment variables
const { config } = require("dotenv");
config();

const configurations = {
  PORT: process.env.PORT || 4000,
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_DATABASE: process.env.MONGODB_DB || "portalFoxReplays",
  MONGODB_URI: "mongodb+srv://kevnnard:Kevnnard2021@cluster0.gavvh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};

module.exports = configurations;
 

// MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "localhost"}/${
//   process.env.MONGODB_DATABASE || "portalFoxReplays"
// }`,