const axios = require('axios')
const { GITHUB_TOKEN } = require('../config')

exports.fetchRepoData = async (path) => {
  const response = await axios.get(`https://api.github.com/repos/${path}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const data = response.data

  return {
    owner: data.owner.login,
    name: data.name,
    url: data.html_url,
    stars: data.stargazers_count,
    forks: data.forks_count,
    issues: data.open_issues_count,
    createdAt: Math.floor(new Date(data.created_at).getTime() / 1000),
  }
}
