const Repo = require('../models/Repo')
const githubService = require('../services/githubService')

exports.getAllRepos = async (req, res) => {
  const repos = await Repo.find({ userId: req.session.userId })
  res.json(repos)
}

exports.createRepo = async (req, res) => {
  const { path } = req.body
  try {
    const repoData = await githubService.fetchRepoData(path)

    const repo = await Repo.create({
      owner: repoData.owner,
      name: repoData.name,
      url: repoData.url,
      stars: repoData.stars,
      forks: repoData.forks,
      issues: repoData.issues,
      createdAt: repoData.createdAt,
      userId: req.session.userId,
    })

    res.json(repo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteRepo = async (req, res) => {
  const { id } = req.params
  await Repo.deleteOne({ _id: id, userId: req.session.userId })
  res.json({ message: 'Deleted successfully' })
}

exports.updateRepo = async (req, res) => {
  const { id } = req.params
  const repo = await Repo.findOne({ _id: id, userId: req.session.userId })
  if (!repo) return res.status(404).json({ error: 'Repo not found' })

  const path = `${repo.owner}/${repo.name}`
  const repoData = await githubService.fetchRepoData(path)

  repo.stars = repoData.stars
  repo.forks = repoData.forks
  repo.issues = repoData.issues
  await repo.save()

  res.json(repo)
}
