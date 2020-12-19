const express = require('express')

const memberController = require('../controllers/member.controller')

const memberRoute = (pool) => {
  const router = express.Router()

  router.get('/', (req, res) => memberController.handleMemberGet(req, res, pool))
  router.post('/', (req, res) => memberController.handleMemberPost(req, res, pool))
  router.put('/', (req, res) => memberController.handleMemberPut(req, res, pool))

  return router
}

module.exports = memberRoute
