const express = require('express')

const adminController = require('../controllers/admin.controller')

const adminRoute = (pool) => {
  const router = express.Router()

  router.post('/login', (req, res) => adminController.handleAdminLoginPost(req, res, pool))

  return router
}

module.exports = adminRoute
