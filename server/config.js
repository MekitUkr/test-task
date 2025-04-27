require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
}
