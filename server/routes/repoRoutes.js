const express = require('express')
const router = express.Router()
const { getAllRepos, createRepo, deleteRepo, updateRepo } = require('../controllers/repoController')

router.get('/', getAllRepos)
router.post('/', createRepo)
router.delete('/:id', deleteRepo)
router.get('/:id', updateRepo)

module.exports = router
