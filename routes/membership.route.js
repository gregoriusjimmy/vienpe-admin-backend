const express = require('express')

const membershipController = require('../controllers/membership.controller')

const membershipRoute = (pool) => {
  const router = express.Router()

  router.get('/', (req, res) => membershipController.handleMembershipGet(req, res, pool))
  router.post('/', (req, res) => membershipController.handleMemberPost(req, res, pool))

  return router
}

module.exports = membershipRoute
