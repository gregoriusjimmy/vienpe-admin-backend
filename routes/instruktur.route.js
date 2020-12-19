const express = require('express')

const instrukturController = require('../controllers/instruktur.controller')

const instrukturRoute = (pool) => {
  const router = express.Router()

  router.post('/', (req, res) => instrukturController.handleInstrukturPost(req, res, pool))

  return router
}

module.exports = instrukturRoute
