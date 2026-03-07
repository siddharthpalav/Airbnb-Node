const dotenv = require("dotenv");
const path = require("path");

// dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql", // or 'postgres', etc.
  },
  // ... test and production
};

module.exports = config;
