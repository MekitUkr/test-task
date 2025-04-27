const mongoose = require('mongoose')

const RepoSchema = new mongoose.Schema({
  owner: String,
  name: String,
  url: String,
  stars: Number,
  forks: Number,
  issues: Number,
  createdAt: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Repo', RepoSchema)
