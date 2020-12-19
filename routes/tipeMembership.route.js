const express = require('express')

const tipeMembershipController = require('../controllers/tipeMembership.controller')

const tipeMembershipRoute = (pool) => {
  const router = express.Router()

  router.get('/', (req, res) => tipeMembershipController.handleTipeMembershipGet(req, res, pool))
  router.post('/', (req, res) => tipeMembershipController.handleTipeMembershipPost(req, res, pool))

  return router
}

module.exports = tipeMembershipRoute
